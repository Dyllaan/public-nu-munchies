<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Councillor;

use App\Classes\UserSubSystem\UserTypeEndpoint;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This endpoint checks if the user is a councillor
 */
class IsCouncillor extends UserTypeEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'councillor', 'councillor');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getUserType()->is()) {
            $this->setResponse(200, "User is a " . $this->getType());
        } else {
            $this->setResponse(401, "User is a " . $this->getType());
        }
    }
}
