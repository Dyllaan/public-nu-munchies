<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\Users;

use App\Classes\UserSubSystem\ModeratorEndpoint;

class IsModerator extends ModeratorEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'moderator');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
