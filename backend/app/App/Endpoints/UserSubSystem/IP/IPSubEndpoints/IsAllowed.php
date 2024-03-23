<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the PUT request to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\IP\IPSubEndpoints;

use Core\Endpoint\Endpoint;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * SubEndpoint to AllIPs, removes an IP from the users allowed IP's
 */
class IsAllowed extends Endpoint
{

    public function __construct() 
    {
        parent::__construct('POST', 'allowed');
        $this->getAttributes()->addRequiredStrings(['ip']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $ip = $request->getAttribute('ip');
        if(filter_var($ip, FILTER_VALIDATE_IP)) {
            $allowed = $this->getUser()->getIPHandler()->isIPAllowed($request->getAttribute('ip'));
            if($allowed) {
                $this->setResponse(200, 'IP Allowed');
            } else {
                $this->setResponse(403, 'IP Not Allowed');
            }
        } 
        $this->setResponse(400, 'Invalid IP');
    }
}