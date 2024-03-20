<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;

use App\Classes\BusinessSubsystem\Address;
use App\Classes\BusinessSubsystem\Business;

use Core\Endpoint\SubEndpoint\SubEndpoint;

class DeleteBusiness extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('DELETE', 'delete');
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

        $business = new Business($this->getDb());

        $userBusinesses = $business->getBusinessesByUser($user);

        if (!in_array($fields['id'], array_column($userBusinesses, 'id'))) {
            $this->setResponse(401, "You are not allowed to delete this business");
            return;
        }

        $business->id = $fields['id'];

        $res = $business->delete();

        $this->setResponse(200, $fields['id']);
    }
}
