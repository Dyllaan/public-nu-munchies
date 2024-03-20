<?php
    /**
     * class RemoveNutrition
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a food Nutrition from the nutrition_details table.
     */
    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Nutrition;

     class RemoveNutrition extends Endpoint
     {
        public function __construct()
        {
            parent::__construct('DELETE', 'removenutrition');
            $this->getAttributes()->addRequiredInts(['food_id']);
        }
        public function process($request)
        {
            
            parent::process($request);
            $nutrition = new Nutrition($this->getDb());
            $food_id = $request->getAttribute('food_id');
            $nutrition->setFoodId($food_id);
            $nutritionData = $nutrition->delete($food_id);
            $this->setResponse(200, 'Nutrition Deleted', $nutritionData);
            

        }
     }
?>