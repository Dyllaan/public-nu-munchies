<?php

/**
 * class ItemUpload
 * @author Cameron Bramley w21020682
 * 
 * Used by businesses to insert a new item into the items database. Takes name, data, time, businesS_name, status, business_id and price as headers.
 * 
 * @generated ChatGPT was used to help understand and use the the InsertQuery and Database classes developed by Louis.
 */

namespace App\Endpoints\UBIntegration;


use Core\Endpoint\Endpoint;

class ItemUpload extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'itemupload');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['name', 'date', 'time', 'business_name', 'status']);
        $this->getAttributes()->addRequiredInts(['business_id', 'price']);
    }

    public function process($request)
    {

        $id = $this->getDb()->createInsert()->into('items')->cols('business_id, name, price, date, time, business_name, status')->values([$request->getAttribute('business_id'), $request->getAttribute('name'), $request->getAttribute('price'), $request->getAttribute('date'), $request->getAttribute('time'), $request->getAttribute('business_name'), $request->getAttribute('status')])->execute();

        $this->setResponse(200, 'Item Uploaded', ['id' => $id]);
    }
}