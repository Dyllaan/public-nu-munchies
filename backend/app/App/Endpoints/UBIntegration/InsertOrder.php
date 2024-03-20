<?php
/**
 * class InsertOrder
 * @author Cameron Bramley w21020682
 * 
 * Creates a new order in the orders table of the item that was reserved by the user.
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class InsertOrder extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'insertorder');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['business_id', 'user_id', 'item_id']);
    }

    public function process($request)
    {
        $id = $this->getDb()->createInsert()->into('orders')->cols('business_id, customer_id, item_id')
        ->values([$request->getAttribute('business_id'), $request->getAttribute('customer_id'), $request->getAttribute('item_id')])->execute();
        $this->setResponse(200, 'Order Inserted', ['id' => $id]);
    }
}