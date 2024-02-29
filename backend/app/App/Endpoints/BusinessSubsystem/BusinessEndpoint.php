<?php

namespace App\Endpoints\BusinessSubsystem;

use App\Classes\Business;
use Core\Endpoint\Endpoint;

class BusinessEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'business');
        $this->getAttributes()->addAllowedInts(['id']);
    }

    public function process($request)
    {
        parent::process($request);

        $id = $request->getAttribute('id');
        $business = new Business($this->getDb());
        $business->id = 2;
        $business->delete();
        $this->setResponse(200, $business->toArray());
    }
}
