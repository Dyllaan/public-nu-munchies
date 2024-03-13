<?php

namespace App\Endpoints\UFIntegration;

use Core\Endpoint\Endpoint;

class GetCat extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'getcategory');
        
        // Define required attributes
        $this->getAttributes()->addRequiredInts(['cat_id']);
        $this->getAttributes()->addRequiredStrings(['cat_name']);
    }

    public function process($request)
    {
        parent::process($request);

        // Retrieve attributes from the request
        $catId = $request->getAttribute('cat_id');
        $catName = $request->getAttribute('cat_name');

        // Check if both required attributes are present
        if ($catId === null || $catName === null) {
            // If either attribute is missing, set an appropriate response
            $missingAttributes = [];
            if ($catId === null) {
                $missingAttributes[] = 'cat_id';
            }
            if ($catName === null) {
                $missingAttributes[] = 'cat_name';
            }
            $this->setResponse(400, 'Missing required attributes: ' . implode(', ', $missingAttributes));
            return;
        }

        // If both attributes are present, proceed with further processing
        // For now, just showing the received data in the response
        $response = [
            'cat_id' => $catId,
            'cat_name' => $catName
        ];

        $this->setResponse(200, 'Category Shown',  $response);
    }
}
