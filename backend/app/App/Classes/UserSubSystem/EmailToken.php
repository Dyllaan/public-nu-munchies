<?php

/**
 * Token is used to handle the JWT token in an object oriented way
 * @author Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */

namespace App\Classes\UserSubSystem;

use App\Classes\Token;
use Core\HTTP\Classes\GivesResponse;
use App\Factories\EmailFactory;
use Core\ClientErrorException;
use Firebase\JWT\JWT;

class EmailToken extends GivesResponse
{
    protected \AppConfig $appConfigInstance;
    private $user;
    private $type;

    public function __construct($type = 'email_verification')
    {
        $this->appConfigInstance = new \AppConfig();
        $this->setType($type);
    }
  
    public function sendEmail()
    {
        $jwt = $this->generateEmailToken();

        if($this->getType() === 'password_reset'){
            $subject = "NU Munchies Password Reset";
            $link = "http://localhost:3000/verify-email?token=" . $jwt;
            $content = "Please click the link to reset your password: ". $link;
        } else {
            $subject = "NU Munchies Email Verification";
            $link = "http://localhost:3000/verify-email?token=" . $jwt;
            $content = "Please click the link to verify your email: ". $link;
        }

        $email = EmailFactory::createEmail(
            $this->getUser()->getEmail(), 
            $this->getUser()->getName(), 
            $subject,
            $content
        );
        $email->sendEmail();
    }
    
    public function validate($jwt)
    {
        $key = $this->appConfigInstance->get('EMAIL_JWT_SECRET');
        try {
            $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
            if($decodedJWT->type !== $this->getType()) {
                $this->setResponse(401, 'Email token invalid type');
            } else if($decodedJWT->id !== $this->getUser()->getId()) {
                $this->setResponse(401, 'Email token invalid user');
            } else {
                return true;
            }
        } catch (\Firebase\JWT\ExpiredException $e) {
            $this->setResponse(401, 'Email token expired');
        } catch (\Exception $e) {
            $this->setResponse(401, 'Email token invalid');
        }
    }

    public function generateEmailToken()
    {
        $secretKey = $this->appConfigInstance->get('EMAIL_JWT_SECRET');

        $iat = time();
        $exp = strtotime('+10 minutes', $iat);
        $iss = $_SERVER['HTTP_HOST'];
        $payload = [
            'id' => $this->getUser()->getId(),
            'iat' => $iat,
            'exp' => $exp,
            'iss' => $iss,
            'type' => $this->getType()
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
    }

    public function getType()
    {
        return $this->type;
    }

  public function setType($type)
  {
    $this->type = $type;
  }

  public function getUser() {
    return $this->user;
  }

  public function setUser($user)
  {
    $this->user = $user;
  }
}
