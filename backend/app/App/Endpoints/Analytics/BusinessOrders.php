<?php

//This is the endpoint for a business' 'total orders received' part of the dash
//Also gonna have the 'money made' part of the dashboard as it makes more sense

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class BusinessOrders extends SubEndpoint
{
    //call:
    // - each order number
    // - order items for each order
    // - order date for each order
    // - business name related to each order

    public function __construct()
    {
        parent::__construct('GET', 'business-orders');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "Business Orders stats retrieved", $analytics->getBusinessOrders());
    }
}