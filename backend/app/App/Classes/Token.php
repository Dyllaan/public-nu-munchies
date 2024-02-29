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
  private $providerId;

  private \AppConfig $appConfigInstance;

  public function __construct()
  {
    $this->valid = false;
    $this->appConfigInstance = new \AppConfig();
    $this->validateToken();
  }

  private function validateToken()
  {
    $key = $this->appConfigInstance->get('JWT_SECRET');
    $authorizationHeader = $this->getAuthorizationHeaders();
    if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
      $this->setResponse(401, 'Bearer token not found!');
    }
    $jwt = trim(substr($authorizationHeader, 7));

    try {
      $decodedJWT = JWT::decode($jwt, new \Firebase\JWT\Key($key, 'HS256'));
      $this->setUserId($decodedJWT->id);
      $this->setProviderId($decodedJWT->provider_id);
      $this->setValid(true);
    } catch (\Firebase\JWT\ExpiredException $e) {
      $this->setResponse(401, 'Token expired');
    } catch (\Exception $e) {
      $this->setResponse(401, 'Invalid token');
    }
  }

  private function getAuthorizationHeaders()
  {
    if (array_key_exists('HTTP_AUTHORIZATION', $_SERVER)) {
      return $_SERVER['HTTP_AUTHORIZATION'];
    }
    $this->setResponse(401, 'Authorization via Bearer token is required!');
  }

  public function isValid()
  {
    return $this->valid;
  }

  private function setValid($valid)
  {
    $this->valid = $valid;
  }

  public function getUserId()
  {
    return $this->userId;
  }

  public function getProviderId()
  {
    return $this->providerId;
  }

  private function setProviderId($providerId)
  {
    $this->providerId = $providerId;
  }

  private function setUserId($userId)
  {
    $this->userId = $userId;
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
