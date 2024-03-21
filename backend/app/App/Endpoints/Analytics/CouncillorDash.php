<?php

// This is the endpoint for the councilor's dashboard where
// business and user rankings are displayed so they can be contacted for rewards

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class CouncillorDash extends SubEndpoint
{

    //call:
    // - list of user rankings
    // - list of business rankings

    public function __construct()
    {
        parent::__construct('GET', 'councillor-dash');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "Councillor stats retrieved", $analytics->councillorView());
    }

}