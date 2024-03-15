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
use Core\Database\CrudModel;

class EmailToken extends CrudModel
{
    protected \AppConfig $appConfigInstance;
    private $user;
    private $type;

    public function __construct($db, $type = 'email_verification')
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setType($type);
        $this->setTable('used_email_tokens');
    }
  
    public function sendEmail()
    {
        $jwt = $this->generateEmailToken();

        if($this->getType() === 'password_reset'){
            $subject = "NU Munchies Password Reset";
            $link = "http://localhost:3000/change?token=" . $jwt;
            $content = "Please click the link to reset your pasword: ". $link . " This link will expire in 10 minutes";
        } else {
            $subject = "NU Munchies Email Verification";
            $content = "Enter this code on the verification page: ". $jwt . " This code will expire in 10 minutes";
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
        if($this->isAlreadyUsed($jwt)) {
            $this->setResponse(401, 'Email token already used');
        }
        $key = $this->appConfigInstance->get('EMAIL_JWT_SECRET');
        try {
            $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
            if($decodedJWT->type !== $this->getType()) {
                $this->setResponse(401, 'Email token invalid type');
            } else if($decodedJWT->id !== $this->getUser()->getId()) {
                $this->setResponse(401, 'Email token invalid user');
            } else {
                $this->storeAsUsed($jwt, $decodedJWT->id);
                return true;
            }
        } catch (\Firebase\JWT\ExpiredException $e) {
            $this->setResponse(401, 'Email token expired');
        } catch (\Exception $e) {
            $this->setResponse(401, 'Email token invalid');
        }
    }

    protected function isAlreadyUsed($jwt)
    {
        $result = $this->getDb()->createSelect()->from($this->getTable())->cols("token")->where(["token = '".$jwt."'"])->execute();
        return count($result) > 0;
    }

    protected function storeAsUsed($jwt, $userId)
    {
        try {
            $this->getDb()->createInsert()->into($this->getTable())->cols('token, user_id')->values([$jwt, $userId])->execute();
            return true;
        } catch (\Exception $e) {
            $this->setResponse(500, 'Error storing token as used');
            return false;
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
