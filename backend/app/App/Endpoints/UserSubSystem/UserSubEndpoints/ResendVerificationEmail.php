<?php
/**
 * @author Louis Figes W21017657
 * @generated Github Copilot was used during the creation of this code.
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class ResendVerificationEmail extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'resend-verification-email');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getUser()->getEmailHandler()->sendEmailToken('email_verification')){
            $this->setResponse(200, 'Email sent');
        }
        
    }
}