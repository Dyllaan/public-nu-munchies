<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Address;
use App\Classes\BusinessSubsystem\Business;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class MyBusinesses extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'my');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);

        $user = $this->getUser();

        $business = new Business($this->getDb());

        $businesses = $business->getBusinessesByUser($user);
        $this->setResponse(200, $businesses);
    }
}
