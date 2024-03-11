<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\Users;

use App\Classes\UserSubSystem\User;
use \App\Endpoints\Users\UserSubEndpoints\RegisterUser;
use \App\Endpoints\Users\UserSubEndpoints\EditUser;
use \App\Endpoints\Users\UserSubEndpoints\LoginUser;
use \App\Endpoints\Users\UserSubEndpoints\VerifyEmailOTP;
use \App\Endpoints\Users\UserSubEndpoints\ResendEmail;
use \App\Endpoints\Users\UserSubEndpoints\ForgotPassword;
use Core\Endpoint\Endpoint;

class UserEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'user');
        $this->addSubEndpoint(new RegisterUser());
        $this->addSubEndpoint(new EditUser());
        $this->addSubEndpoint(new LoginUser());
        $this->addSubEndpoint(new VerifyEmailOTP());
        $this->addSubEndpoint(new ResendEmail());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
