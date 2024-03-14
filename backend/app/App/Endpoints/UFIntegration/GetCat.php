<?php

namespace App\Endpoints\UFIntegration;

use Core\Endpoint\Endpoint;
use App\Models\Category; // Assuming Category model exists and is correctly imported

class GetCat extends Endpoint
{
    public function __construct()
    {
        parent::__construct('GET', 'getcategory');
        $this->getAttributes()->addRequiredInts(['cat_id']);
        $this->getAttributes()->addRequiredStrings(['cat_name','cat_image']);
    }

    public function process($request)
    {
        parent::process($request);
        
        // Creating Category instance
        $cat = new Category($this->getDb());
        
        // Retrieving attributes from the request
        $cat_id = $request->getAttribute('cat_id');
        $cat_name = $request->getAttribute('cat_name');
        $cat_image = $request->getAttribute('cat_image');
        
        // Setting attributes
        $cat->setCatId($cat_id);
        $cat->setCatName($cat_name);
        $cat->setCatImage($cat_image);
        
        // Getting category data from the database
        $categoryData = $cat->getCategory();
        
        // Converting category data to an array
        $categoryArray = $categoryData->toArray();
        
        // Setting response
        $this->setResponse(200, 'Category Shown', $categoryArray);
    }
}
