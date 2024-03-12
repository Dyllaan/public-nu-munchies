<?php

// This is the endpoint for the councilor's dashboard where
// business and user rankings are displayed so they can be contacted for rewards

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class CouncilorDash extends SubEndpoint
{

    //call:
    // - list of user rankings
    // - list of business rankings

    public function __construct()
    {
        parent::__construct('GET', 'councilor-dash');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Councilor Dash retrieved');
    }

}