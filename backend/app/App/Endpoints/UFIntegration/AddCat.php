<?php
    /**
     * class AddCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Used to upload a catagory to the cat database and to display 
     * on the website.
     */

     namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Category;

    class AddCat extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('POST', 'addcategory');
            $this->getAttributes()->addRequiredStrings(['cat_name', 'cat_image']);
        }

        public function process($request)
        {
            parent::process($request);
            $cat = new Category($this->getDb());
            $cat->setCatName($request->getAttribute('cat_name'));
            $cat->setCatImage($request->getAttribute('cat_image'));
            $cat->save();
            $this->setResponse(200, 'Category Created', $cat->toArray());
        }
    }
?>