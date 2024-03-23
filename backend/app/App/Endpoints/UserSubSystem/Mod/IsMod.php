<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserTypeEndpoint;
use App\Endpoints\UserSubSystem\Mod\SearchUsers;
use App\Endpoints\UserSubSystem\Mod\SearchBusiness;
use App\Endpoints\UserSubSystem\Mod\Ban;
use App\Endpoints\UserSubSystem\Mod\RemoveBusiness;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This endpoint checks if the user is a moderator
 */
class IsMod extends UserTypeEndpoint
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
