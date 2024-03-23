<?php
/**
 * class ItemReserve
 * @author Cameron Bramley w21020682
 * 
 * sets item status to reserved, should be used when checkout of item is successful. 
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class ItemReserve extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'itemreserve');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['item_id']);
    }

    public function process($request)
    {
        parent::process($request);

        $status = ['item_status' => 'reserved'];
        $id = $this->getDb()->createUpdate()->table('items')->set($status)->where(["id = '" . $request->getAttribute('item_id'). "'"]);
        if($id->execute()){
            $this->setResponse(200, 'Item Reserved', ['id' => $id]);
        }
        else{
            $this->setResponse(404, 'invalid item_id', ['id' => $id]);
        }

        
    }
} 