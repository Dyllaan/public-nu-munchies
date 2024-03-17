<?php

/**
 * Displays the prevented waste for each user's purchased order and the total sum and saves it to the database
 * @author Jake McCarthy w20043974
 */

namespace App\Endpoints\Analytics;

use App\Classes\Analytics;
use Core\Endpoint\Endpoint;


class UserPreventedWaste extends Endpoint
{

    //put into analytics table where user id is assigned to a value

    public function __construct()
    {
        parent::__construct('GET', 'user-waste');
        $this->setRequiresAuth(true);

    }

    public function process($request)
    {
        parent::process($request);
        // Create an instance of the Analytics class
        $analytics = new Analytics($this->getDb(), $this->getUser());

        // Assuming there is a respondJson method available
        $this->setResponse(200, "user food waste prevented", $analytics->totalUserFoodWastePrevented());
    }
}