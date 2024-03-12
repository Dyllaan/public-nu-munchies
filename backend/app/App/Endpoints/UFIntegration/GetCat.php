<?php


namespace App\Endpoints\UFIntegration;

use App\Classes\Category;
use Core\Endpoint\Endpoint;

class GetItems extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'getcategory');
    }

    public function process($request)
    {
        parent::process($request);
        $id = $this->getDb()->createSelect()
    ->from('category')
    ->cols('cat_id, cat_name, cat_image')
    ->execute();

        
        $this->setResponse(200, 'Category Shown',  $id);
    }
}