<?php

namespace Core\Endpoint\SubEndpoint;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\User;

class AuthSubEndpoint extends SubEndpoint
{

    private $user;

    public function __construct($db, $method, $name)
    {
        parent::__construct($db, $method, $name);
        $this->user = User::getInstance($db);
    }

    public function tokenLogin()
    {
        if (!$this->user->verifyToken()) {
            $this->setResponse(401, 'Invalid token');
        }
    }

    public function process($request)
    {
        parent::process($request);
        $this->tokenLogin();
    }

    protected function getUser()
    {
        return $this->user;
    }

    protected function setUser($user)
    {
        $this->user = $user;
    }
}
