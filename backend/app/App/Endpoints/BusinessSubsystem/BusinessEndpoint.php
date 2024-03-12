<?php

namespace App\Endpoints\BusinessSubsystem;

use App\Classes\BusinessSubsystem\Business;
use App\Endpoints\BusinessSubsystem\Subendpoints\CreateBusiness;
use App\Endpoints\BusinessSubsystem\Subendpoints\UpdateBusiness;
use Core\Endpoint\Endpoint;

class BusinessEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'business');
        $this->getAttributes()->addAllowedInts(['id']);
        $this->addSubEndpoint(new CreateBusiness());
        $this->addSubEndpoint(new UpdateBusiness());
        // $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);

        $id = $request->getAttribute('id');

        $business = new Business($this->getDb());

        $data = [];

        if ($id) {
            $business->id = $id;
            $data = $business->getById();
        } else {
            $data = $business->get();
        }

        $this->setResponse(200, $data);
    }
}
