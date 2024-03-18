<?php
    /**
     * class RemoveCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a category from the Category table.
     */

    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Category;
    
    class RemoveCat extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('DELETE', 'removecategory');
            $this->getAttributes()->addRequiredInts(['cat_id']);
        }
        public function process($request)
        {
            parent::process($request);
            $cat = new Category($this->getDb());
            $cat_id = $request->getAttribute('cat_id');
            $cat->setCatId($cat_id);
            $categoryData = $cat->delete($cat_id);
            $this->setResponse(200, 'Category Deleted', $categoryData);


            /*
            $category = ['category' => 'removed'];
            $id = $this->getDb()->createDelete()->from("categories")->where(["cat_id = '" . $this->cat_id . "'"])->execute();

            $this->setResponse(200, 'Category Removed', ['id' => $id]);
            */
        }
    }
?>