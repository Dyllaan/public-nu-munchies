<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserAddonEndpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;

class RemoveBusiness extends UserAddonEndpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'remove-business', 'moderator');
        $this->getAttributes()->addAllowedInts(['business_id']);
    }

    public function process($request)
    {
        parent::process($request);

        $this->getModerator()->removeBusiness($request->getAttribute('business_id'));
        $this->setResponse(200, "Business has been removed");
    }
}
