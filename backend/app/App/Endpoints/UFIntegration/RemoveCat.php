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
            $this->getAttributes()->addRequiredInts(['food_id']);
        }
        public function process($request)
        {
            $id = $this->getDb()->createDelete()->from('nutrition_details');
        }
    }
?>