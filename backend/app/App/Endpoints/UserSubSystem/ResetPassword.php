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
 * Reset password endpoint is for non-logged in users to change a password using an email token
 */
class ResetPassword extends Endpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'reset-password');
        $this->getAttributes()->addRequiredStrings(['new_password', 'token']);
    }

    public function process($request)
    {
        parent::process($request);
        $user = new User($this->getDb());
        if(!$user->changePassword($request->getAttribute('new_password'), $request->getAttribute('token'))) {
            $this->setResponse(400, 'Password reset failed');
        }
    }
}