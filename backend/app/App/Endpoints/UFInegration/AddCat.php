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
            parent::_construct('POST', 'addcatagory');
            $this->setRequiresAuth(true);
        }
    }
?>