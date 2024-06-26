<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the POST request to login to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\UserSubSystem\User;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles the login of users
 */
class LoginUser extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'login');
        $this->getAttributes()->addRequiredStrings(['email', 'password']);
    }

    public function process($request)
    {
        parent::process($request);
        $user = new User($this->getDb());
        $user->setEmail($request->getAttribute('email'));
        $user->setPassword($request->getAttribute('password'));
        $this->setResponse(201, 'Logged in', $user->login($this->getDb()));
    }
}