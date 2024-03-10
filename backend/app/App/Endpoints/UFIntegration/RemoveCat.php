<?php
    /**
     * class RemoveCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a category from the Category table.
     */

    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\SubEndpoint\SubEndpoint;
    use App\Classes\Category;
    
    class RemoveCat extends SubEndpoint
    {
        public function _construct()
        {
            parent::_construct('DELETE', 'removecategory');
            $this->setRequiresAuth(true);
            $this->getAttributes()->addRequiredInts(['cat']);
        }
        public function process($request)
        {
            $category = ['category' => 'removed'];
            $id = $this->getDb()->createDelete()->table("categories")->set($category)->where(["id - '" . $request->getAttribute('cat_id'). "'"])->execute();

            $this->setResponse(200, 'Category Removed', ['id' => $id]);
        }
    }
?>