<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserTypeEndpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This endpoint allows moderators to remove businesses
 */
class RemoveBusiness extends UserTypeEndpoint
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
