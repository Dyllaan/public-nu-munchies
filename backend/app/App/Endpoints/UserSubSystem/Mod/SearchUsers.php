<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\Mod\ModeratorEndpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;

class SearchUsers extends ModeratorEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'users');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addAllowedInts(['page']);
        $this->getAttributes()->addAllowedStrings(['search']);
        $this->getAttributes()->addAllowedBools(['verified']);
    }

    private function handle($request) 
    {
        $searchFields = ['users.first_name', 'users.last_name', 'users.email'];
        $searchConditions = SearchHelper::searchConditionBuilder($request, $searchFields);
        
        //$verifiedCondition = SearchHelper::addBoolAndConvertToIntCondition($request, 'verified', 'users');
        return SearchHelper::buildConditions($request, [$searchConditions]);
    }


    public function process($request)
    {
        parent::process($request);
        $limit = 10;
        $offset = SearchHelper::handlePagination($request, $limit);
        $conditions = $this->handle($request);
        $usersData = $this->getModerator()->searchUsers($offset, $conditions, $limit);
        
        $this->setResponse(200, "Found user data", $usersData);
    }
}
