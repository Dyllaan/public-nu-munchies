<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Business;

use App\Classes\BusinessSubsystem\Item;
use Core\Endpoint\SubEndpoint\SubEndpoint;

class CreateItem extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'itemscreate');
        $this->getAttributes()->addRequiredStrings(['name', 'collection']);
        $this->getAttributes()->addRequiredInts(['business_id', 'price']);
        $this->getAttributes()->addAllowedInts(['category_id']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $user = $this->getUser();
        if (!isset($user)) {
            return $this->setResponse(401, "User is not logged in!");
        }

        $fields = $request->getAttributes();

        $business = new Business($this->getDb());

        $businessesUser = $business->getBusinessesByUser($user);

        if (count($businessesUser) == 0) {
            $this->setResponse(401, "You are not allowed to create this item");
            return;
        }

        if (array_search($fields['business_id'], array_column($businessesUser, 'id')) === false) {
            $this->setResponse(401, "You are not allowed to create this item");
            return;
        }

        $item = new Item($this->getDb());
        $item->name = $fields['name'];
        $item->price = $fields['price'];
        $item->business_id = $fields['business_id'];
        $item->collection = $fields['collection'];

        if (isset($fields['category_id']))
            $item->category_optional = $fields['category_id'];

        $item->status_optional = "open";
        $res = $item->save();


        $this->setResponse(200, $res);
    }
}
