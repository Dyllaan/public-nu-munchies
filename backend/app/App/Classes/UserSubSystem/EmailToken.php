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
    private $ip;
    private $email;

    public function __construct($db, $type = 'email_verification')
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setType($type);
        $this->setTable('used_email_tokens');
    }
  
    public function sendEmail($newEmail = null)
    {
        $jwt = $this->generateEmailToken($newEmail);

        switch ($this->getType()) {
            case 'password_reset':
                $subject = "NU Munchies Password Reset";
                $link = "http://localhost:3000/change?token=" . $jwt;
                $content = "<html>
                                <body>
                                    <h1>Password Reset Request</h1>
                                    <p>Please click the link below to reset your password. This link will expire in 10 minutes.</p>
                                    <a href='" . $link . "'>Reset Password</a>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                break;
            case 'email_verification':
                $subject = "NU Munchies Email Verification";
                $content = "<html>
                                <body>
                                    <h1>Email Verification</h1>
                                    <p>Enter this code on the verification page: <strong>" . $jwt . "</strong></p>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                break;
            case 'ip_verification':
                $subject = "NU Munchies IP Verification";
                $content = "<html>
                                <body>
                                    <h1>IP Verification</h1>
                                    <p>Enter this code when you log in: <strong>" . $jwt . "</strong></p>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                            break;
            case 'change_email':
                $subject = "NU Munchies Email Change";
                $content = "<html>
                                <body>
                                    <h1>Email Change Request</h1>
                                    <p>Enter this code on your profile page
                                    to permit your email change to <br><strong>". $newEmail ."</strong><br> ". $jwt ."</a>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                break;
            case 'change_password':
                $subject = "NU Munchies Password Change";
                $content = "<html>
                                <body>
                                    <h1>Password Change Request</h1>
                                    <p>Enter this code on your profile page to change your password: <strong>" . $jwt . "</strong></p>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                break;
            case 'delete_account':
                $subject = 'NU Munchies Account Deletion';
                $content = "<html>
                                <body>
                                    <h1>Account Deletion Request</h1>
                                    <p>Enter this code on your profile page to delete your account: <strong>" . $jwt . "</strong></p>
                                    <p>This code will expire in 10 minutes.</p>
                                </body>
                            </html>";
                break;
            default:
                $this->setResponse(400, 'Invalid type');
        }


        $email = EmailFactory::createEmail(
            $this->getUser()->getEmail(), 
            $this->getUser()->getName(), 
            $subject,
            $content
        );
        $email->sendEmail();
        
        return $jwt;
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
            }
            
            if($decodedJWT->type == 'ip_verification') {
                $this->setIP($decodedJWT->ip);
            }

            if($decodedJWT->type == 'change_email') {
                $this->email = $decodedJWT->email;
            }

            if($decodedJWT->id !== $this->getUser()->getId() && $this->getType() !== "password_reset") {
                $this->setResponse(401, 'Email token invalid user', ['id' => $decodedJWT->id, 'user_id' => $this->getUser()->getId()]);
            }
            $this->getUser()->setId($decodedJWT->id);
            $this->storeAsUsed($jwt, $decodedJWT->id);
            return true;
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

    public function generateEmailToken($email = null)
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
        if($this->getType() === 'ip_verification') {
            $payload['ip'] = $_SERVER['REMOTE_ADDR'];
        }
        if($this->getType() === 'change_email' && $email !== null) {
            $payload['email'] = $email;
        }

        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
    }
    
    public function getEmail()
    {
        return $this->email;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getIP()
    {
        return $this->ip;
    }

    public function setIP($ip)
    {
        $this->ip = $ip;
    }

    public function getUser() {
        return $this->user;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }
}
