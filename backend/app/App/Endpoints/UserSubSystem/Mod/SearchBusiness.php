<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\UserAddonEndpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;

class SearchBusiness extends UserAddonEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'businesses', 'moderator');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addAllowedInts(['page']);
        $this->getAttributes()->addAllowedStrings(['search']);
        $this->getAttributes()->addAllowedBools(['verified']);
    }

    private function handle($request) 
    {
        $searchFields = ['business_name', 'business_description', 'business_email', 'business_phone'];
        $searchConditions = SearchHelper::searchConditionBuilder($request, $searchFields);
        
        if($request->hasAttribute('verified')) {
            $verified = $request->getAttribute('verified');
            $veriCon = 'business_verification'. '='. $verified;
            return SearchHelper::buildConditions($request, [$searchConditions, $veriCon]);
        }
        return SearchHelper::buildConditions($request, [$searchConditions]);
    }


    public function process($request)
    {
        parent::process($request);
        $limit = 10;
        $offset = SearchHelper::handlePagination($request, $limit);
        $conditions = $this->handle($request);
        $usersData = $this->getUser()->searchBusinesses($offset, $conditions, $limit);
        
        $this->setResponse(200, "Found business data", $usersData);
    }
}
