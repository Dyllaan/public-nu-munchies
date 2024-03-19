<?php

namespace Core\Endpoint;

use Core\Database\Database;
use Core\HTTP\Classes\GivesResponse;
use Core\Endpoint\Attributes\EndpointAttributes;
use \App\Classes\UserSubSystem\Token;
use \App\Classes\UserSubSystem\User;
use \App\Classes\UserSubSystem\OAuthUser;

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

    /**
     * Performance enhancement: store the instance in a static variable.
     */
    public function setupDatabase()
    {
        $this->db = Database::getInstance();
    }

    public function getDb()
    {
        return $this->db;
    }

    public function process($request)
    {
        $this->getAttributes()->validate($request->getAttributes());

        if ($this->requiresAuth()) {
            $this->assignUser();
        }
    }

    public function assignUser()
    {
        $token = new Token();
        if (!$token->isValid()) {
            $this->setResponse(401, 'Token is invalid');
        }
        switch ($token->getProviderId()) {
            case 1:
                $this->user = User::getInstance($this->getDb());
                $this->user->setId($token->getUserId());
                $this->user->get();
                break;
            case 2:
                $this->user = new OAuthUser($this->getDb());
                $this->user->setId($token->getUserId());
                $this->user->get();
                break;
        }
    }

    public function getUser()
    {
        return $this->user;
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