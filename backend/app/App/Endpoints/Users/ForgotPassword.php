<?php
/**
 * @author Louis Figes W21017657
 */
namespace App\Endpoints\Users;

use Core\Endpoint\Endpoint;
use App\Classes\UserSubSystem\EmailToken;
use App\Classes\UserSubSystem\User;

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
        if($user->sendPasswordResetEmail()) {
            $this->setResponse(200, 'Password reset email sent');
        }
    }
}