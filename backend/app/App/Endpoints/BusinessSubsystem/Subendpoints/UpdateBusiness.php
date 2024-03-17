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

        $userBusinesses = $business->getBusinessesByUser($user);

        if (!in_array($fields['id'], array_column($userBusinesses, 'id'))) {
            $this->setResponse(401, "You are not allowed to update this business");
            return;
        }

        // fetch the business data from db
        $business->id = $fields['id'];
        $business->getById(false);


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

        if (!isset($business->verified_optional_hidden)) {
            $business->verified_optional_hidden = false;
        }

        $res = $business->update();

        $newBusiness = $business->getById(false);

        $this->setResponse(200, $newBusiness);
    }
}
