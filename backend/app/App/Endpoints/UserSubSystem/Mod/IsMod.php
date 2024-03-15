<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\Mod\ModeratorEndpoint;
use App\Endpoints\UserSubSystem\Mod\SearchUsers;
use App\Endpoints\UserSubSystem\Mod\SearchBusiness;

class IsMod extends ModeratorEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'moderator');
        $this->setRequiresAuth(true);
        $this->addSubEndpoint(new SearchUsers());
        $this->addSubEndpoint(new SearchBusiness());
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getModerator()->isModerator()) {
            $this->setResponse(200, "User is a moderator");
        } else {
            $this->setResponse(401, "User is not a moderator");
        }
    }
}
