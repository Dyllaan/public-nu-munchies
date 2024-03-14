<?php

    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Nutrition;

    class GetNutrition extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('GET', 'getnutrition');
            $this->getAttributes()->addRequiredInts(['food_id']);
        }
        public function process($request)
        {
            parent::process($request);

            $nutrition = new Nutrition($this->getDb());

            $food_id = $request->getAttribute('food_id');
            $nutrition->setFoodId($food_id);
            $nutritionData = $nutrition->get($food_id);
            $nutritionArray = $nutritionData->toArray();

            $this->setResponse(200, 'Nutrition Shown', $nutritionArray);
        }
    }

?>