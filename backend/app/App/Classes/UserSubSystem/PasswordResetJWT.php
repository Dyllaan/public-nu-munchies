<?php

/**
 * Token is used to handle the JWT token in an object oriented way
 * @author Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */

namespace App\Classes\UserSubSystem;

use App\Classes\Token;
use App\Factories\EmailFactory;
use Core\ClientErrorException;
use Firebase\JWT\JWT;

class PasswordResetJWT extends EmailToken
{
  private $userId;
  
  public function __construct()
  {
    parent::__construct('password_reset');
  }
  
  public function validate($jwt)
  {
    $key = $this->appConfigInstance->get('EMAIL_JWT_SECRET');
    try {
      $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
      if($decodedJWT->type !== $this->getType()) {
        $this->setResponse(401, 'Email token invalid type');
      } else {
        $this->setUserId($decodedJWT->id);
        return true;
      }
    } catch (\Firebase\JWT\ExpiredException $e) {
      $this->setResponse(401, 'Email token expired');
    } catch (\Exception $e) {
      $this->setResponse(401, 'Email token invalid');
    }
  }
  
  public function getUserId()
  {
    return $this->userId;
  }

  private function setUserId($userId)
  {
    $this->userId = $userId;
  }
}
