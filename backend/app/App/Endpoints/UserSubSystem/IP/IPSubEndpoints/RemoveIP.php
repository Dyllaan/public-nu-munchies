<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the PUT request to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\IP\IPSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class RemoveIP extends SubEndpoint
{

    public function __construct() 
    {
        parent::__construct('POST', 'remove');
        $this->getAttributes()->addRequiredStrings(['ip']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        if($this->getUser()->getIPHandler()->removeIP($request->getAttribute('ip'))) {
            $this->setResponse(200, "IP removed");
        } else {
            $this->setResponse(400, "IP not found");
        }
    }
}