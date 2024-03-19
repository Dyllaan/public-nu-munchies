<?php

namespace App\Classes\UserSubSystem\Mod;

use Core\Endpoint\Endpoint;

abstract class ModeratorEndpoint extends Endpoint
{
    private $moderator;

    public function __construct($method, $url) 
    {
        parent::__construct($method, $url);
        $this->setRequiresAuth(true);
    }

    public function process($request) {
        parent::process($request);
        $this->createAndCheckForModerator();
    }

    public function getModerator() {
        return $this->moderator;
    }

    public function setModerator($moderator) {
        $this->moderator = $moderator;
    }

    public function createAndCheckForModerator()
    {
        $this->moderator = new Moderator($this->getDb());
        $this->getModerator()->setUser($this->getUser());
        if (!$this->moderator->isModerator()) {
            $this->setResponse(403, 'You do not have permission to access this resource');
            return false;
        }
        return true;
    }
}