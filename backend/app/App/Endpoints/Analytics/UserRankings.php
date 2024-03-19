<?php

/**
 * Displays the user's ranking amongst the other user rankings
 * @author Jake McCarthy w2004397
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UserRankings extends SubEndpoint
{
    //call:
    // - user's rank number (for top and highlight)
    // - user's name (for highlight)
    // - all user names
    // - each user's total points

    public function __construct()
    {
        parent::__construct('GET', 'user-rankings');

    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User Rankings retrieved');
    }
}