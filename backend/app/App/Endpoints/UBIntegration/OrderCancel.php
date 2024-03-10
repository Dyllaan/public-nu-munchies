<?php
/**
 * class OrderCancel
 * @author Cameron Bramley w21020682
 * 
 * sets order status to cancelled
 * 
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class OrderCancel extends Endpoint
{

    public function __construct()
    {
        parent::__construct('PUT', 'ordercancel');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['order_id']);
    }

    public function process($request)
    {
        $status = ['status' => 'cancelled'];
        $id = $this->getDb()->createUpdate()->table("orders")->set($status)->where(["id = '" . $request->getAttribute('order_id'). "'"])->execute();
        
        $this->setResponse(200, 'Order cancelled', ['id' => $id]);
    }
}  