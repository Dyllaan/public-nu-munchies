<?php

namespace App\Endpoints\UFIntegration;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\Category;

class EditCat extends SubEndpoint
{
    public function __construct()
    {
        parent::__construct('PUT', 'editcategory');
        $this->getAttributes()->addRequiredInts(['cat_id']);
        $this->getAttributes()->addAllowedStrings(['cat_name']);
    }

    public function process($request)
    {
        parent::process($request);
        $changeFlag = false;

        $cat = new Category($this->getDb());

        $cat_id = $request->getAttribute('cat_id');

        $cat->setCatId($cat_id);

        // Check if $request is an array or an object with the necessary methods
        if (!is_array($request) && !method_exists($request, 'getAttributes')) {
            $this->setResponse(400, ['message' => 'Invalid request format']);
            return;
        }

        // Assuming $request has a getAttributes() method
        $attributes = $request->getAttributes();
        if ($attributes === null || empty($attributes)) {
            $this->setResponse(400, ['message' => 'No attributes to edit']);
            return;
        }

        if ($request->hasAttribute('cat_name')) {
            $changeFlag = true;
            $cat->setCatName($request->getAttribute('cat_name'));
        }

        if ($changeFlag) {
            $cat->update();
            $this->setResponse(201, "Category Updated", $cat->toArray());
        } else {
            $this->setResponse(400, ['message' => 'No attributes to edit']);
        }
    }
}
