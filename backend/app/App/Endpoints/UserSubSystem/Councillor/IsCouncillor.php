<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Councillor;

use App\Classes\UserSubSystem\UserAddonEndpoint;

class IsCouncillor extends UserAddonEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'councillor', 'councillor');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getUserAddon()->is()) {
            $this->setResponse(200, "User is a " . $this->getType());
        } else {
            $this->setResponse(401, "User is a " . $this->getType());
        }
    }
}
