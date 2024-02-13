<?php
/**
 * Token is used to handle the JWT token in an object oriented way
 * @author Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */
namespace App\Classes;

use \Firebase\JWT\JWT;
use Core\HTTP\Classes\GivesResponse;

class Token extends GivesResponse
{
  private $valid;
  private $userId;
  
  public function __construct() 
  {
    $this->valid = false;
    if($id = $this->validateToken()) {
        $this->valid = true;
        $this->userId = $id;
    }
  }
  private function validateToken()
  {
    $key = SECRET;
    $authorizationHeader = $this->getAuthorizationHeaders();
    if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
      $this->setResponse(401, 'Invalid token3');
    }
    $jwt = trim(substr($authorizationHeader, 7));

    try {
      $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
      return $decodedJWT->id;
    } catch (\Firebase\JWT\ExpiredException $e) {
      $this->setResponse(401, 'Token expired');
    } catch (\Exception $e) {
      $this->setResponse(401, 'Invalid token');
    }
  }

  private function getAuthorizationHeaders()
  {
    $allHeaders = getallheaders();
    $authorizationHeader = "";
    if (array_key_exists('Authorization', $allHeaders)) {
      $authorizationHeader = $allHeaders['Authorization'];
    } elseif (array_key_exists('authorization', $allHeaders)) {
      $authorizationHeader = $allHeaders['authorization'];
    }
    return $authorizationHeader;
  }

  public function isValid() 
  {
    return $this->valid;
  }

  public function getUserId() 
  {
    return $this->userId;
  }
}