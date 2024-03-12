<?php

/**
 * Displays the prevented waste for each business' sold order and the total sum and saves it to the database
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class BusinessPreventedWaste extends SubEndpoint
{
    //call:
    //see userpreventedwaste endpoint

    public function __construct()
    {
        parent::__construct('GET', 'business-waste');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Business Prevented Waste retrieved');
    }
}