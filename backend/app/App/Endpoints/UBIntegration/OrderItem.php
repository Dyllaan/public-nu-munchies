<?php
/**
 * class OrderItem
 * @author Cameron Bramley w21020682
 * 
 * Creates a new order in the orders table of the item that was reserved by the user.
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class OrderItem extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'orderplace');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['date', 'collect_time', 'item_name', 'business_name', 'status']);
        $this->getAttributes()->addRequiredInts(['business_id', 'customer_id', 'item_id', 'price']);
    }

    public function process($request)
    {
        $id = $this->getDb()->createInsert()->into('order')->cols('business_id, customer_id, item_id, date, collect_time, price, item_name, business_name, status')
        ->values([$request->getAttribute('business_id'), $request->getAttribute('customer_id'), $request->getAttribute('item_id'), $request->getAttribute('date'), 
        $request->getAttribute('collect_time'), 
        $request->getAttribute('price'), $request->getAttribute('item_name'), $request->getAttribute('business_name'), $request->getAttribute('status')])->execute();
        $this->setResponse(200, 'Item ordered', ['id' => $id]);
    }
}