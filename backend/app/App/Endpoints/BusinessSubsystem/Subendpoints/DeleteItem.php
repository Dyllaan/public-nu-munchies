<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Business;

use App\Classes\BusinessSubsystem\Item;
use Core\Endpoint\SubEndpoint\SubEndpoint;

class DeleteItem extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('DELETE', 'itemsdelete');
        $this->getAttributes()->addRequiredInts(['id']);
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

        $item = new Item($this->getDb());
        $item->id = $fields['id'];
        $res = $item->getById();

        $business = new Business($this->getDb());
        $businessesUser = $business->getBusinessesByUser($user);


        if (count($businessesUser) == 0) {
            $this->setResponse(401, "You are not allowed to delete this item");
            return;
        }
        $requiredBusinessId = $res['business_id'];

        foreach ($businessesUser as $business) {
            if ($business['id'] == $requiredBusinessId) {
                $res = $item->delete();
                $this->setResponse(200, $res);
                return;
            }
        }

        $this->setResponse(401, "You are not allowed to delete this item");
    }
}
