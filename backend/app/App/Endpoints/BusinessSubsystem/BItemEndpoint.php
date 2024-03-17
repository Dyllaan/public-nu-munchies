<?php

namespace App\Endpoints\BusinessSubsystem;

use App\Classes\BusinessSubsystem\Business;
use App\Classes\BusinessSubsystem\Item;
use Core\Endpoint\Endpoint;

class BItemEndpoint extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'businessitem');
        $this->getAttributes()->addRequiredStrings(['name']);
        $this->getAttributes()->addAllowedStrings(['status']);
        $this->getAttributes()->addRequiredInts(['price', 'expiry', 'business_id']);
        $this->getAttributes()->addAllowedInts(['category', 'collection']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);

        $user = $this->getUser();
        $business = new Business($this->getDb());
        $businesses = $business->getBusinessesByUser($user);

        if (!in_array($request->getAttributes()['business_id'], array_column($businesses, 'id'))) {
            $this->setResponse(401, "You are not allowed to create item for this business");
            return;
        }

        $fields = $request->getAttributes();
        $item = new Item($this->getDb());

        $item->name = $fields['name'];
        $item->business_id = $fields['business_id'];
        // unix to date
        $item->collection = date('Y-m-d H:i:s', $fields['collection']);
        $item->price = $fields['price'];
        $item->expiry = date('Y-m-d H:i:s', $fields['expiry']);
        $item->category = $fields['category'];
        $item->status = $fields['status'];

        $res = $item->save();

        $this->setResponse(200, $res);
    }
}
