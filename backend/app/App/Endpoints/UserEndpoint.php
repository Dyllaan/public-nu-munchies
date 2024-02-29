<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints;

use App\Classes\User;
use \App\Endpoints\Users\RegisterUser;
use \App\Endpoints\Users\EditUser;
use \App\Endpoints\Users\LoginUser;
use Core\Endpoint\Endpoint;

class UserEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'user');
        $this->addSubEndpoint(new RegisterUser());
        $this->addSubEndpoint(new EditUser());
        $this->addSubEndpoint(new LoginUser());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
