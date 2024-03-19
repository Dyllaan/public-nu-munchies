<?php

/**
 * This is the endpoint for displaying the user's "Total businesses helped"
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\SubEndpoint\SubEndpoint;


class UsersHelp extends SubEndpoint
{

    //call:
    // - business names - need to get business names of businesses that are linked to the user through order id
    // - order numbers - order id of above^
    // - total businesses helped - sum of unique business id's where user_id =m the user id in orders

    public function __construct()
    {
        parent::__construct('GET', 'businesses-helped');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "Business Helped stats retrieved", $analytics->usersHelp());
    }

}