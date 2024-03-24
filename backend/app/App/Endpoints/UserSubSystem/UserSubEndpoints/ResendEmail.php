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
 * Handles the resending of emails containing OTPs
 */
class ResendEmail extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'resend-email');
        $this->getAttributes()->addRequiredStrings(['type']);
        $this->getAttributes()->addAllowedStrings(['new_email', 'new_password', 'ip']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $type = $request->getAttribute('type');
        switch($type){
            case 'change_email':
                if(!$request->hasAttribute('new_email')){
                    $this->setResponse(400, 'New email required');
                    return;
                }
                $this->getUser()->getEmailHandler()->changeEmail($request->getAttribute('new_email'));
                $this->setResponse(200, 'Email sent', ['new_email'=> $request->getAttribute('new_email')]);
                break;
            case 'change_password':
                if(!$request->hasAttribute('new_password')){
                    $this->setResponse(400, 'Password required');
                    return;
                }
                if($this->getUser()->getEmailHandler()->sendEmailToken($type, null, $request->getAttribute('new_password'))){
                    $this->setResponse(200, 'Email sent');
                }
                break;
            case 'ip_verification':
                if(!$request->hasAttribute('ip')){
                    $this->setResponse(400, 'IP required');
                    return;
                }
                if(!filter_var($request->getAttribute('ip'), FILTER_VALIDATE_IP)){
                    $this->setResponse(400, 'Invalid IP');
                    return;
                }
                if($this->getUser()->getIPHandler()->isIPAllowed($request->getAttribute('ip'))){
                    $this->setResponse(200, 'IP already allowed');
                    return;
                }
                if($this->getUser()->getEmailHandler()->sendEmailToken($type, null, null, $request->getAttribute('ip'))){
                    $this->setResponse(200, 'Email sent');
                }
                break;
            case 'email_verification':
            case 'delete_account':
                if($this->getUser()->getEmailHandler()->sendEmailToken($type)){
                    $this->setResponse(200, 'Email sent');
                }
                break;
            default:
                $this->setResponse(400, 'Invalid type', ['supported'=> ['ip_verification', 'email_verification', 'change_email', 'delete_account']]);
                return;
                break;
        }

        $this->setResponse(400, 'Unable to send email');
    }
}