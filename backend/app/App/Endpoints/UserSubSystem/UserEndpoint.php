<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem;

use App\Classes\UserSubSystem\User;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\RegisterUser;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\EditUser;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\LoginUser;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\VerifyUser;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\ResendVerificationEmail;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\ForgotPassword;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\DeleteUser;
use Core\Endpoint\Endpoint;

class UserEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'user');
        $this->addSubEndpoint(new RegisterUser());
        $this->addSubEndpoint(new EditUser());
        $this->addSubEndpoint(new LoginUser());
        $this->addSubEndpoint(new VerifyUser());
        $this->addSubEndpoint(new ResendVerificationEmail());
        $this->addSubEndpoint(new DeleteUser());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
