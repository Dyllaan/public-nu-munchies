<?php
    /**
     * class RemoveCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a category from the Category table.
     */

    use Core\Endpoint\Endpoint;
    use Core\HTTP\Classes\Request;
    use Core\Database\Queries;
    use Core\Database;
    
    class RemoveCat extends Endpoint
    {
        public function _construct()
        {
            parent::_construct('POST', 'removecategory');
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