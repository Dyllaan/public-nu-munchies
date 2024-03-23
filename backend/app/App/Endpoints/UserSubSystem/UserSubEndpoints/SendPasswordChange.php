<?php
/**
 * @author Louis Figes W21017657
 * @generated Github Copilot was used during the creation of this code.
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
class SendPasswordChange extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'send-password-change');
        $this->getAttributes()->addAllowedStrings(['new_password']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        if(!$request->hasAttribute('new_password')){
            $this->setResponse(400, 'New Password required');
        }
        if($this->getUser()->getEmailHandler()->sendEmailToken('change_password', null, $request->getAttribute('new_password'))){
            $this->setResponse(200, 'Email sent');
        }
        $this->setResponse(400, 'Unable to send email');
    }
}