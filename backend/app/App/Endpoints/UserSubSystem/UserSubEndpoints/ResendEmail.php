<?php
/**
 * @author Louis Figes W21017657
 * @generated Github Copilot was used during the creation of this code.
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class ResendIPVerifyEmail extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'resend-verification-ip');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['type']);
    }

    public function process($request)
    {
        parent::process($request);
        switch ($request->getAttribute('type')) {
            case 'ip_verification':
                if($this->getUser()->getEmailHandler()->sendEmailToken('ip_verification')){
                    $this->setResponse(200, 'Email sent');
                }
                break;
            default:
                $this->setResponse(400, 'Invalid type');
                break;
        }
    }
}