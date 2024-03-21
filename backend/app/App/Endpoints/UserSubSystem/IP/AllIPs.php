<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\IP;

use Core\Endpoint\Endpoint;
use App\Endpoints\UserSubSystem\IP\IPSubEndpoints\RemoveIP;

class AllIPs extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'ip');
        $this->setRequiresAuth(true);
        $this->addSubEndpoint(new RemoveIP());
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'All IPs', $this->getUser()->getIPHandler()->getAll());
    }
}
