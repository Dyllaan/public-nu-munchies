<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserAddonEndpoint;
use App\Endpoints\UserSubSystem\Mod\SearchUsers;
use App\Endpoints\UserSubSystem\Mod\SearchBusiness;
use App\Endpoints\UserSubSystem\Mod\Ban;
use App\Endpoints\UserSubSystem\Mod\RemoveBusiness;

class IsMod extends UserAddonEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'moderator', 'moderator');
        $this->setRequiresAuth(true);
        $this->addSubEndpoint(new SearchUsers());
        $this->addSubEndpoint(new SearchBusiness());
        $this->addSubEndpoint(new Ban());
        $this->addSubEndpoint(new RemoveBusiness());
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getModerator()->is()) {
            $this->setResponse(200, "User is a moderator");
        } else {
            $this->setResponse(401, "User is not a moderator");
        }
    }
}
