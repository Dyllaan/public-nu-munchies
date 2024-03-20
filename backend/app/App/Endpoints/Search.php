<?php
namespace App\Endpoints;

use Core\Endpoint\Endpoint;
use App\Classes\UserSubSystem\Helpers\SearchHelper;

class Search extends Endpoint
{
    public function __construct() 
    {
        parent::__construct('GET', 'search');
        $this->getAttributes()->addAllowedInts(['page', 'cat_id']);
        $this->getAttributes()->addRequiredStrings(['search']);
        $this->setRequiresAuth(true);
    }

    private function handleBusinesses($request) 
    {
        $searchFields = ['business_name', 'business_description'];
        $searchConditions = SearchHelper::searchConditionBuilder($request, $searchFields);
        return SearchHelper::buildConditions($request, [$searchConditions]);
    }

    private function handleItems($request)
    {
        $searchFields = ['item_name'];
        $searchConditions = SearchHelper::searchConditionBuilder($request, $searchFields);
        return SearchHelper::buildConditions($request, [$searchConditions]);
    }

    public function process($request)
    {
        parent::process($request);  
        $limit = 10;
        $catId = null;
        if($request->hasAttribute('cat_id')) {
            $catId = $request->getAttribute('cat_id');
        }
        $offset = SearchHelper::handlePagination($request, $limit);

        $conditions = $this->handleBusinesses($request);
        $businessData = $this->getUser()->searchBusinesses($offset, $conditions, $limit);

        $conditions = $this->handleItems($request);
        $itemsData = $this->getUser()->searchItems($offset, $conditions, $limit, $catId);
        
        $this->setResponse(200, "Found business data", ['businesses' => $businessData, 'items' => $itemsData]);
    }
}