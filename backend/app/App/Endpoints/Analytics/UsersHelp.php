<?php

/**
 * This is the endpoint for displaying the user's "Total businesses helped"
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UsersHelp extends SubEndpoint
{

    //call:
    // - business names
    // - order numbers
    // - total businesses helped
    // - date of order

    public function __construct()
    {
        parent::__construct('GET', 'businesses-helped');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'Business Helped stats retrieved');
    }

}