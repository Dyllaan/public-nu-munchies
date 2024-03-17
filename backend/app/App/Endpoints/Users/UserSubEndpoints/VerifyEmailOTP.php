<?php
/**
 * @author Louis Figes W21017657
 */
namespace App\Endpoints\Users\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class VerifyEmailOTP extends SubEndpoint
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
        $this->getUser()->verifyEmailOTP($request->getAttribute('token'), "email_verification");
    }
}