<?php
    /**
     * class AddCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Used to upload a catagory to the cat database and to display 
     * on the website.
     */

     namespace App\Endpoints\UFInegration;

    use Core\Endpoint\Endpoint;
    use Core\HTTP\Classes\Request;
    use Core\Database\Queries;
    use Core\Database;

    class AddCat extends Endpoint
    {
        public function _construct()
        {
            parent::_construct('POST', 'category');
            $this->setRequiresAuth(true);
            $this->getAttributes()->addRequiredString(['cat_name', 'cat_image']);
        }

        public function process($request)
        {
            parent::process($request);
            $cat = Cat::getInstance($this->getDb());
            $cat->setCatName($request->getAttribute('cat_name'));
            $cat->setCatImage($request->getAttribute('cat_image'));
            $cat->category($this->getDb());
            $this->setResponse(200, 'Category Created', $cat->toArray());
        }
    }
?>