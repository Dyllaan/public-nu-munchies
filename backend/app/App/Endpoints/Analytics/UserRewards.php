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
    // - items bought
    // - userFoodWastePrevented()
    // - points()
    

    public function __construct()
    {
        parent::__construct('GET', 'user-rewards');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User Rewards retrieved');
    }
}