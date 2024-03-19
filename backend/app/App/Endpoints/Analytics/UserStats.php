<?php

/**
 * This is the endpoint for the user's dashboard where all the stats will be displayed
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use App\Classes\User;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UserStats extends SubEndpoint
{
    //call:
    // - user's name - getFirstUserName()
    // - total orders placed for user - getOrdersPlaced()
    // - totalUserFoodWastePrevented()
    // - total businesses helped - getBusinessesHelped()
    // - user's ranking - 
    // - top 3 rankings - getTopUserRankings()
    // - points total (for rewards - "See rewards >") - getTotalUserPoints()

    public function __construct()
    {
        parent::__construct('GET', 'user-stats');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "user stats", $analytics->userStats());
        
    }
}