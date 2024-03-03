<?php
    /**
     * class RemoveNutrition
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a food Nutrition from the nutrition_details table.
     */

     use Core\Endpoint\Endpoint;
     use Core\HTTP\Classes\Request;
     use Core\Database\Queries;
     use Core\Database;

     class RemoveNutrition extends Endpoint
     {
        public function _construct()
        {
            parent::_construct('POST', 'removenutrition');
            $this->setRequiresAuth(true);
            $this->getAttributes()->addRequiredInts(['food_id']);
        }
        public function process($request)
        {
            $nutrition = ['nutrition' => 'removed'];
            $id = $this->getDb()->createDelete()->table('nutrition_details')->set($nutrition)->where("id - '" . $request->getAttribute('food_id'). "'")->execute();

            $this->setResponse(200, 'Foods Nutrition Removed', ['id' => $id]);
        }
     }
?>