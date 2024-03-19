<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Business;
use App\Classes\BusinessSubsystem\Order;
use Core\Endpoint\SubEndpoint\SubEndpoint;

class GetBusinessOrders extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'orders');
        $this->getAttributes()->addRequiredInts(['id']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $user = $this->getUser();
        if (!isset($user)) {
            return $this->setResponse(401, "User is not logged in!");
        }

        $fields = $request->getAttributes();

        $business = new Business($this->getDb());
        $userBusinesses = $business->getBusinessesByUser($user);

        if (!in_array($fields['id'], array_column($userBusinesses, 'id'))) {
            $this->setResponse(401, "You are not allowed to see orders for this business");
            return;
        }

        $order = new Order($this->getDb());
        $res = $order->getOrdersByBusiness($fields['id']);

        $this->setResponse(200, $res);
    }
}
