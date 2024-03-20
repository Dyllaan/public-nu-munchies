<?php

namespace App\Classes\UserSubSystem;

use Core\Endpoint\Endpoint;
use App\Classes\UserSubSystem\UserTypes\Councillor;
use App\Classes\UserSubSystem\UserTypes\Moderator;

/**
 * 
 */

abstract class UserAddonEndpoint extends Endpoint
{
    private $userAddon;
    private $type;

    public function __construct($method, $url, $type) 
    {
        parent::__construct($method, $url);
        $this->setRequiresAuth(true);
        $this->type = $type;
    }

    public function process($request) {
        parent::process($request);
        $this->createAndCheck();
    }

    public function getUserAddon() {
        return $this->userAddon;
    }

    public function setUserAddon($userAddon) {
        $this->userAddon = $userAddon;
    }

    public function getType() {
        return $this->type;
    }

    public function createAndCheck()
    {
        switch($this->getType()) {
            case 'councillor':
                $this->userAddon = new Councillor($this->getDb());
                break;
            case 'moderator':
                $this->userAddon = new Moderator($this->getDb());
                break;
            default:
                $this->setResponse(404, 'Type not found');
                return false;
        }

        $this->getUserAddon()->setUser($this->getUser());
        if (!$this->getUserAddon()->is()) {
            $this->setResponse(403, 'You do not have permission to access this resource');
            return false;
        }
        return true;
    }

    public function getModerator() {
        return $this->getUserAddon();
    }
}