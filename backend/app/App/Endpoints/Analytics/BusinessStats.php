<?php

/**
 * This is the endpoint for the business' dashboard where all the stats will be displayed
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class BusinessStats extends SubEndpoint
{
    //call:
    // - business name
    // - total orders received for business
    // - totalBusinessFoodWastePrevented()
    // - top 3 business rankings
    // - points total

    public function __construct()
    {
        parent::__construct('GET', 'business-stats');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Business Stats retrieved');
    }
}