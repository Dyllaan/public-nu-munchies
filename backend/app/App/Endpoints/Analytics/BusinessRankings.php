<?php

/**
* Displays the business' ranking amongst the other business' rankings
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class BusinessRankings extends SubEndpoint
{
    //call:
    // - business' rank number (for top and highlight)
    // - business' name (for highlight)
    // - all business names
    // - each business' total points

    public function __construct()
    {
        parent::__construct('GET', 'business-rankings');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "User Rewards stats retrieved", $analytics->getBusinessRankings());
    }
}