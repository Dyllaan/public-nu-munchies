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

  private \AppConfig $appConfigInstance;

  public function __construct()
  {
    $this->valid = false;
    $this->appConfigInstance = new \AppConfig();

    if ($id = $this->validateToken()) {
      $this->valid = true;
      $this->userId = $id;
    }
  }
  private function validateToken()
  {
    $key = $this->appConfigInstance->get('JWT_SECRET');
    $authorizationHeader = $this->getAuthorizationHeaders();
    if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
      $this->setResponse(401, 'Invalid token3');
    }
    $jwt = trim(substr($authorizationHeader, 7));

    $userId = null;

    try {
      $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
      $userId = $decodedJWT;
    } catch (\Firebase\JWT\ExpiredException $e) {
      $this->setResponse(401, 'Token expired');
    } catch (\Exception $e) {
      $this->setResponse(401, 'Invalid token');
    }
    return $userId;
  }

  private function getAuthorizationHeaders()
  {
    if (array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {

      $authorizationHeader = $_SERVER['HTTP_AUTHORIZATION'];
      /// uncomment if you want to see the headers is passed
      //var_dump($authorizationHeader);

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

  // use this if you need to see the headers

  function getCustomHeaders()
  {
    $headers = array();
    foreach ($_SERVER as $key => $value) {
      if (preg_match("/^HTTP_/", $key)) {
        $key = preg_replace("/^HTTP_/", "", $key);
        $headers[$key] = $value;
      }
    }
    return $headers;
  }
}
