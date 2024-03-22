<?php

/**
 * Previews the user's rewards
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UserRewards extends SubEndpoint
{
    //call:
    // - order number
    // 
    // - userFoodWastePrevented()
    // - points()
    

    public function __construct()
    {
        parent::__construct('GET', 'user-rewards');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "User Rewards stats retrieved", $analytics->getUserRewards());
    }
}