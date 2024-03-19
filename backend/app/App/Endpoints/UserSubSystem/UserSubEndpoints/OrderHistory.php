<?php
/**
 * @author Louis Figes W21017657
 * @generated Github Copilot was used during the creation of this code.
 * This endpoint requests an email to be resent to the user with a new OTP.
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class OrderHistory extends SubEndpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'order-history');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);

        $data = $this->getDb()->createSelect()->cols("orders.id, status, business_name, item_name, item_price,  collect_time")->from("orders")
        ->join("businesses", "businesses.id = orders.business_id")
        ->join("items", "items.id = orders.items_id")
        ->where(["user_id = " . $this->getUser()->getId()])->execute();
        $this->setResponse(200, "Order history", $data);
        
    }
}