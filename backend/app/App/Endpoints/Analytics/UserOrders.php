<?php

//This is the endpoint for a user's 'total orders placed' part of the dashboard

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UserOrders extends SubEndpoint
{
    //call:
    // - each order number
    // - order items for each order
    // - order date for each order
    // - business name related to each order

    public function __construct()
    {
        parent::__construct('GET', 'user-orders');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "User Orders stats retrieved", $analytics->getUserOrders());
    }

}