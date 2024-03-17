<?php

    namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Nutrition;

    class GetNutrition extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('GET', 'getnutrition');
            $this->getAttributes()->addRequiredInt('item_id');
        }
        public function process($request)
        {
            parent::process($request);

            $nutrition = new Nutrition($this->getDb());

            $item_id = $request->getAttribute('item_id');
            if(strlen($item_id) > 0){
                $nutrition->setItemId($item_id);
                $nutritionData = $nutrition->get($item_id);
                $nutritionArray = $nutrition->toArray();

                $this->setResponse(200, 'Nutrition Shown', $nutritionArray);
            }
            $this->setResponse(200, 'No Data', []);
        }
    }

?>