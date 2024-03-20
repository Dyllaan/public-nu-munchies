<?php
/**
 * @author Louis Figes W21017657
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class VerifyEmailToken extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'verify-email-token');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['token', 'type']);
    }

    public function process($request)
    {
        parent::process($request);


        /** 
         * Only allow supported verification types
        */
        if($request->getAttribute('type') !== 'email_verification' && $request->getAttribute('type') !== 'ip_verification') {
            $this->setResponse(400, 'Invalid verification type');
            return;
        }

        $this->getUser()->get();
        if($this->getUser()->getEmailHandler()->verifyEmailToken($request->getAttribute('token'), $request->getAttribute('type'))) {
            $this->setResponse(200, 'This token has been verified', $this->getUser()->toArray());
        } else {
            $this->setResponse(400, 'Unable to verify user');
        }
    }
}