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
use \App\Endpoints\UserSubSystem\UserSubEndpoints\SendPasswordChange;
use Core\Endpoint\Endpoint;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Is the /user/ endpoint has many subendpoints for user actions
 */
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
        $this->addSubEndpoint(new SendPasswordChange());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}
