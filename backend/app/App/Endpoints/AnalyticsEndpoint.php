<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints;

use App\Classes\Analytics;
use App\Endpoints\Analytics\BusinessRewards;
use App\Endpoints\Analytics\BusinessOrders;
use App\Endpoints\Analytics\BusinessStats;
use App\Endpoints\Analytics\CouncillorDash;
use App\Endpoints\Analytics\MoneyMade;
use App\Endpoints\Analytics\UserRewards;
use App\Endpoints\Analytics\UsersHelp;
use App\Endpoints\Analytics\UserOrders;
use App\Endpoints\Analytics\UserStats;
use Core\Endpoint\Endpoint;

class AnalyticsEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'analytics');
        $this->addSubEndpoint(new BusinessRewards());
        $this->addSubEndpoint(new BusinessOrders());
        $this->addSubEndpoint(new BusinessStats());
        $this->addSubEndpoint(new CouncillorDash());
        $this->addSubEndpoint(new MoneyMade());
        $this->addSubEndpoint(new UserRewards());
        $this->addSubEndpoint(new UsersHelp());
        $this->addSubEndpoint(new UserOrders());
        $this->addSubEndpoint(new UserStats());
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $this->setResponse(200, 'User retrieved', $this->getUser()->toArray());
    }
}