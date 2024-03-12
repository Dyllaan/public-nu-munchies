<?php

    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;

    class GetCat extends Endpoint
    {

        public function __construct()
        {
            parent::__construct('GET', 'getcategory');
            
            $this->getAttributes()->addRequiredInts(['cat_id']);
            $this->getAttributes()->addRequiredStrings(['cat_name']);
        }

        public function process($request)
        {
            parent::process($request);
            $id = $this->getDb()->createSelect()->table("categories")->cols('cat_id, cat_name')->execute();

            
            $this->setResponse(200, 'Category Shown',  $id);
        }
    }
?>