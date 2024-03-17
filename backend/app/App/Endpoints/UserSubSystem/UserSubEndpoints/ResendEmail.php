<?php
/**
 * @author Louis Figes W21017657
 * @generated Github Copilot was used during the creation of this code.
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class ResendEmail extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'resend-email');
        $this->getAttributes()->addRequiredStrings(['type']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $type = $request->getAttribute('type');
        switch($type){
            case 'ip_verification':
            case 'email_verification':
                break;
            default:
                $this->setResponse(400, 'Invalid type');
                return;
        }
        if($this->getUser()->getEmailHandler()->sendEmailToken($type)){
            $this->setResponse(200, 'Email sent');
        }
        
    }
}