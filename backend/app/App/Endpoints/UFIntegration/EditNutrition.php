<?php
    /**
     * class EditCat
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Used to edit a nutrition that is already been created in the 
     * database.
     */

     namespace App\Endpoints\UFIntegration;

     use Core\Endpoint\SubEndpoint\SubEndpoint;
     use App\Classes\Nutrition;

     class EditNutrition extends SubEndpoint
     {
        public function __construct()
        {
            parent::__construct('PUT', 'editnutrition');
            $this->getAttributes()->addAllowedInts(['food_id', 'weight', 'calories', 'protein', 'carbs', 'fat', 'salt', 'quantity']);
        }
        public function process($request)
        {
            parent::process($request);
            $changeFlag = false;

            $nutrition = new Nutrition($this->getDb());
            $food_id = $request->getAttribute('food_id');
            $nutrition->setFoodId($food_id);


            if (!is_array($request) && !method_exists($request, 'getAttributes')) {
                $this->setResponse(400, ['message' => 'Invalid request format']);
                return;
            }

            $attributes = $request->getAttributes();
            if($attributes == null || empty($attributes))
            {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }
            if($request->hasAttribute('weight'))
            {
                $changeFlag = true;
                $nutrition->setWeight($request->getAttribute('weight'));
            }
            if($request->hasAttribute('calories'))
            {
                $changeFlag = true;
                $nutrition->setCalories($request->getAttribute('calories'));
            }
            if($request->hasAttribute('protein'))
            {
                $changeFlag = true;
                $nutrition->setProtein($request->getAttribute('protein'));
            }
            if($request->hasAttribute('carbs'))
            {
                $changeFlag = true;
                $nutrition->setCarbs($request->getAttribute('carbs'));
            }
            if($request->hasAttribute('fat'))
            {
                $changeFlag = true;
                $nutrition->setFat($request->getAttribute('fat'));
            }
            if($request->hasAttribute('salt'))
            {
                $changeFlag = true;
                $nutrition->setSalt($request->getAttribute('salt'));
            }
            if($request->hasAttribute('quantity'))
            {
                $changeFlag = true;
                $nutrition->setQuantity($request->getAttribute('quantity'));
            }

            if($changeFlag)
            {
                $nutrition->update();
                $this->setResponse(201, "Nutrition Updated", $nutrition->toArray());
            } else {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }
        }
     }
?>