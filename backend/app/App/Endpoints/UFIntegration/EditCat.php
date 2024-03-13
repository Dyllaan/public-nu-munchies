<?php
    /**
     * class EditCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Used to edit a catagory that is already been created in the 
     * database.
     */

     namespace App\Endpoints\UFIntegration;

     use Core\Endpoint\SubEndpoint\SubEndpoint;
     use App\Classes\Category;

     class EditCat extends SubEndpoint
     {
        public function __construct()
        {
            parent::__construct('PUT', 'edit');
            $this->getAttributes()->addAllowedStrings(['cat_name', 'cat_image']);
        }
        public function process($request)
        {
            parent::process($request);
            $changeFlag = false;

            $attributes = $request->getAttributes();
            if($attributes == null || empty($attributes))
            {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }
            if($request->hadAttribute('cat_name'))
            {
                $changeFlag = true;
                $this->getCategory()->setCatName($request->getAttribute('cat_name'));
            }
            if($request->hadAttribute('cat_image'))
            {
                $changeFlag = true;
                $this->getCategory()->setCatImage($request->getAttribute('cat_image'));
            }

            if($changeFlag)
            {
                $this->getCategory()->update();
            } else {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }

            $this->setResponse(201, "Category Updated", $this->getCategory()->toArray());
        }
     }
?>