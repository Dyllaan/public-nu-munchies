<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserTypeEndpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This endpoint allows moderators to search for users
 */
class SearchUsers extends UserTypeEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'users', 'moderator');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addAllowedInts(['page']);
        $this->getAttributes()->addAllowedStrings(['search']);
        $this->getAttributes()->addAllowedBools(['verified', 'banned']);
    }

    private function handle($request) 
    {
        $searchFields = ['users.first_name', 'users.last_name', 'users.email'];
        $searchConditions = SearchHelper::searchConditionBuilder($request, $searchFields);
        
        $allCons[] = $searchConditions;

        if($request->hasAttribute('verified')) {
            $verified = ($request->getAttribute('verified') == 'true' ? 1 : 0);
            $veriCon = 'verified'. '='. $verified;
            $allCons[] = $veriCon;
        }

        if($request->hasAttribute('banned')) {
            $banned = ($request->getAttribute('banned') == 'true' ? 1 : 0);
            $banCon = 'banned'. '='. $banned;
            $allCons[] = $banCon;
        }
        
        return SearchHelper::buildConditions($request, $allCons);
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
