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
    ->cols("items.id, items.business_id, item_name, item_price, item_expiry, TO_CHAR(collect_time, 'HH24:MI') as collect_time, TO_CHAR(collect_time, 'DD') as collect_date, ROUND(AVG(rating), 1) AS average_rating, businesses.business_name, addresses.address_line1, addresses.address_postcode, addresses.address_city")
    ->join('businesses', 'businesses.id = business_id')
    ->join('reviews', 'reviews.business_id = items.business_id')
    ->join('addresses', 'addresses.id = businesses.business_address')
    ->where([
        "item_status = 'open'",
        "collect_time >= NOW() AND collect_time <= NOW() + INTERVAL '24 hours' GROUP BY items.id, businesses.business_name, businesses.business_address, addresses.address_line1, addresses.address_postcode, addresses.address_city"
    ])->execute();

        
        $this->setResponse(200, 'Items Retrieved',  $id);
    }
}