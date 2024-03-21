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
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "Business stats retrieved", $analytics->businessStats());
    }
}