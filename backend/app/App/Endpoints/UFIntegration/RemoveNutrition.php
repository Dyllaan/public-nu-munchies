<?php
    /**
     * class RemoveNutrition
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to remove a food Nutrition from the nutrition_details table.
     */
    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\SubEndpoint\SubEndpoint;
    use App\Classes\Nutrition;

     class RemoveNutrition extends SubEndpoint
     {
        public function __construct()
        {
            parent::__construct('DELETE', 'removenutrition');
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