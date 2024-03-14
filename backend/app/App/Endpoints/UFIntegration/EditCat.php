<?php

namespace App\Endpoints\UFIntegration;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\Category;

class EditCat extends SubEndpoint
{
    public function __construct()
    {
        parent::__construct('PUT', 'editcategory');
        $this->getAttributes()->addAllowedStrings(['cat_name', 'cat_image']);
    }

    public function process($request)
    {
        parent::process($request);
        $changeFlag = false;

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

        if ($request->hadAttribute('cat_name')) {
            $changeFlag = true;
            $this->getCategory()->setCatName($request->getAttribute('cat_name'));
        }
        if ($request->hadAttribute('cat_image')) {
            $changeFlag = true;
            $this->getCategory()->setCatImage($request->getAttribute('cat_image'));
        }

        if ($changeFlag) {
            $this->getCategory()->update();
            $this->setResponse(201, "Category Updated", $this->getCategory()->toArray());
        } else {
            $this->setResponse(400, ['message' => 'No attributes to edit']);
        }
    }
}
