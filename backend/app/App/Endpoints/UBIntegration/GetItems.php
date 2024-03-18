<?php

/**
 * class GetItems
 * @author Cameron Bramley w21020682
 * fetches all items that are available within the next 24 hours that aren't already reserved. 
 */

namespace App\Endpoints\UBIntegration;
use Core\Endpoint\Endpoint;

class GetItems extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'getitems');
    }

    public function process($request)
    {
        parent::process($request);
        $id = $this->getDb()->createSelect()
    ->from('items')
    ->cols("items.id, business_id, item_name, item_price, item_expiry, TO_CHAR(collect_time, 'DD:HH:MI') as collect_time, business_name, business_address")
    ->join('businesses', 'businesses.id = business_id')
    ->where([
        "item_status = 'open'",
        "collect_time >= NOW() AND collect_time <= NOW() + INTERVAL '24 hours'"
    ])->execute();

        
        $this->setResponse(200, 'Items Retrieved',  $id);
    }
}