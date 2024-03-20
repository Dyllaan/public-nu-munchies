<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Business;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class GetBusinessItems extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'items');
        $this->getAttributes()->addRequiredInts(['id']);
    }

    public function process($request)
    {
        parent::process($request);
        $fields = $request->getAttributes();

        $business = new Business($this->getDb());
        $business->id = $fields['id'];

        $items = $business->getItems();

        $this->setResponse(200, $items);
    }
}
