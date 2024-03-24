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

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Business Orders retrieved');
    }

}