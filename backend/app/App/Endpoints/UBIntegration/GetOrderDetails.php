<?php
namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class GetOrderDetails extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'getorderdetails');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['order_id']);
    }

    public function process($request)
    {
        $id = $this->getDb()->createSelect()->from('orders')->cols('business_id, customer_id, item_id, id, business_name, business_address')
        ->where([
        "id = ". $request->getAttributes('order_id')
    ])->execute();
        $this->setResponse(200, 'Order Inserted', ['id' => $id]);
    }
}