<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Address;
use App\Classes\BusinessSubsystem\Business;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class UpdateBusiness extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'update');
        $this->getAttributes()->addRequiredInts(['id']);
        $this->getAttributes()->addAllowedStrings(['email', 'phone',  'name', 'description', 'address', 'city', 'postcode', 'country']);
    }

    public function process($request)
    {
        parent::process($request);

        $fields = $request->getAttributes();


        $addressId = null;

        if (isset($fields['address'])) {
            // create address object
            $address = new Address($this->getDb());
            $address->city = $fields['city'];
            $address->address = $fields['address'];
            $address->postcode = $fields['postcode'];
            $address->country = $fields['country'];
            $res = $address->save();

            $addressId = $res["id"];
        }

        $business = new Business($this->getDb());

        // fetch the business data from db
        $business->id = $fields['id'];
        $business->getById();


        if ($addressId) {
            $business->address = $addressId;
        }

        if (isset($fields['name'])) {
            $business->name = $fields['name'];
        }

        if (isset($fields['description'])) {
            $business->description = $fields['description'];
        }

        if (isset($fields['phone'])) {
            $business->phone_optional = $fields['phone'];
        }

        if (isset($fields['email'])) {
            $business->email_optional = $fields['email'];
        }


        $res = $business->update();

        $this->setResponse(200, $res);
    }
}
