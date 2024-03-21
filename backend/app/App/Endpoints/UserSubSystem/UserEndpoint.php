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
use \App\Endpoints\UserSubSystem\UserSubEndpoints\VerifyEmailToken;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\ResendEmail;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\ForgotPassword;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\DeleteUser;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\OrderHistory;
use \App\Endpoints\UserSubSystem\UserSubEndpoints\SendPasswordChange;
use Core\Endpoint\Endpoint;

class UserEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'user');
        $this->addSubEndpoint(new RegisterUser());
        $this->addSubEndpoint(new EditUser());
        $this->addSubEndpoint(new LoginUser());
        $this->addSubEndpoint(new VerifyEmailToken());
        $this->addSubEndpoint(new ResendEmail());
        $this->addSubEndpoint(new DeleteUser());
        $this->addSubEndpoint(new OrderHistory());
        $this->addSubEndpoint(new SendPasswordChange());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
