<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the POST request register to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\UserSubSystem\User;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles the registration of a new user
 */
class RegisterUser extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'register');
        $this->getAttributes()->addRequiredStrings(['first_name', 'last_name', 'email', 'password']);
    }

    public function process($request)
    {
        parent::process($request);
        if(!filter_var($request->getAttribute('email'), FILTER_VALIDATE_EMAIL)) {
            $this->setResponse(400, 'Invalid email');
            return;
        }
        if(strlen($request->getAttribute('password')) < 8) {
            $this->setResponse(400, 'Password must be at least 8 characters');
            return;
        }
        $user = User::getInstance($this->getDb());
        $user->setFirstName($request->getAttribute('first_name'));
        $user->setLastName($request->getAttribute('last_name'));
        $user->setEmail($request->getAttribute('email'));
        $user->setPassword($request->getAttribute('password'));
        $user->register($this->getDb());
        $this->setResponse(201, 'User created', $user->toArray());
    }
}