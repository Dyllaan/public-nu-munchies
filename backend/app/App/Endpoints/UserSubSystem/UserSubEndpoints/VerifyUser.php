<?php
/**
 * @author Louis Figes W21017657
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class VerifyUser extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('POST', 'verify-user');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredString('token');
    }

    public function process($request)
    {
        parent::process($request);
        $this->getUser()->get();
        if($this->getUser()->getEmailHandler()->verifyEmailToken($request->getAttribute('token'), 'email_verification')) {
            $this->setResponse(200, 'User verified');
        }
    }
}