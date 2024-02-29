<?php

namespace Core\Endpoint;

use Core\Database\Database;
use Core\HTTP\Classes\GivesResponse;
use Core\Endpoint\Attributes\EndpointAttributes;
use \App\Classes\Token;
use \App\Classes\User;

abstract class EndpointBase extends GivesResponse
{
    protected $db;
    protected $method;
    protected $attributes;
    protected $url;
    protected $requiresAuth = false;
    protected $user;

    public function __construct() 
    {
        $this->setupDatabase();
        $this->attributes = new EndpointAttributes();
    }

    public function getUser() {
        //singleton
        if ($this->user == null) {
            $this->user = User::getInstance($this->getDb());
        }
        return $this->user;
    }

    public function process($request)
    {
        $this->getAttributes()->validate($request->getAttributes());

        if ($this->requiresAuth()) {
            $this->getUser()->verifyToken();
        }
    }

    public function verifyToken()
    {
        $token = new Token();
        if ($token->isValid()) {
            $this->setId($token->getUserId());
            $this->get();
            return true;
        } else {
            $this->setResponse(400, "Invalid token");
        }
    }

    protected function setDB($dbName) 
    {
        $this->db = new Database($dbName);
    }

    protected function setupDatabase() 
    {
        $this->setDB('nu-munchies.db');
    }

    public function getDb() 
    {
        return $this->db;
    }

    public function getAttributes()
    {
        return $this->attributes;
    }

    protected function setMethod($method)
    {
        $this->method = $method;
    }

    public function getMethod()
    {
        return $this->method;
    }

    protected function setUrl($url)
    {
        $this->url = $url;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function requiresAuth()
    {
        return $this->requiresAuth;
    }

    public function setRequiresAuth($requiresAuth)
    {
        $this->requiresAuth = $requiresAuth;
    }
}