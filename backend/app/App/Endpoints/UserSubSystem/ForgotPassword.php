<?php
/**
 * @author Louis Figes W21017657
 */
namespace App\Endpoints\UserSubSystem;

use Core\Endpoint\Endpoint;
use App\Classes\UserSubSystem\EmailToken;
use App\Classes\UserSubSystem\User;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Is the endpoint requested when a user presses "forgot password" on the frontend.
 * Will send them an email token to reset their password
 */
class ForgotPassword extends Endpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'forgot-password');
        $this->getAttributes()->addRequiredString('email');
    }

    public function process($request)
    {
        parent::process($request);
        $user = new User($this->getDb());
        $user->setEmail($request->getAttribute('email'));
        $user->get();
        /* note: sendpasswordresetemail() will handle if the user doesnt exist
        * we need to return the same thing to not give away if a user exists
        at that email or not
        */
        $user->getEmailHandler()->sendEmailToken("password_reset");
        $this->setResponse(200, 'If a user with that email exists, a password reset email has been sent');
    }
}