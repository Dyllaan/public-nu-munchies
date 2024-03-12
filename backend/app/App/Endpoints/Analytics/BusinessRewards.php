<?php

/**
 * Displays the business' rewards
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class BusinessRewards extends SubEndpoint
{
    //call:
    // - order number
    // - items sold
    // - businessFoodWastePrevented()
    // - points()

    public function __construct()
    {
        parent::__construct('GET', 'business-rewards');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Business Rewards retrieved');
    }
}
