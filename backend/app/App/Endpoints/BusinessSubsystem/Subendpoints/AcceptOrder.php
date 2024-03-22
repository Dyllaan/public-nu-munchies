<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Business;

use App\Classes\BusinessSubsystem\Order;
use Core\Endpoint\SubEndpoint\SubEndpoint;

class AcceptOrder extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'orderaccept');
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

        $order = new Order($this->getDb());

        $order->id = $fields['id'];
        $res = $order->getById();


        $business = new Business($this->getDb());
        $businessesUser = $business->getBusinessesByUser($user);


        if (count($businessesUser) == 0) {
            $this->setResponse(401, "You are not allowed to accept this order");
            return;
        }

        if (array_search($order->business_id, array_column($businessesUser, 'id')) === false) {
            $this->setResponse(401, "You are not allowed to accept this order");
            return;
        }

        $res = $order->acceptOrder();

        $this->setResponse(200, $res);
    }
}
