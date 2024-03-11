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
            $this->getAttributes()->addAllowedStrings(['food_name']);
            $this->getAttributes()->addAllowedInts(['weight', 'calories', 'protein', 'carbs', 'fat', 'salt', 'quantity']);
        }
        public function process($request)
        {
            parent::process($request);
            $changeFlag = false;

            $attributes = $request->getAttributes();
            if($attributes == null || empty($attributes))
            {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }
            if($request->hadAttribute('food_name'))
            {
                $changeFlag = true;
                $this->getNutrition()->setFoodName($request->getAttribute('food_name'));
            }
            if($request->hadAttribute('weight'))
            {
                $changeFlag = true;
                $this->getNutrition()->setWeight($request->getAttribute('weight'));
            }
            if($request->hadAttribute('calories'))
            {
                $changeFlag = true;
                $this->getNutrition()->setCalories($request->getAttribute('calories'));
            }
            if($request->hadAttribute('protein'))
            {
                $changeFlag = true;
                $this->getNutrition()->setProtein($request->getAttribute('protein'));
            }
            if($request->hadAttribute('carbs'))
            {
                $changeFlag = true;
                $this->getNutrition()->setCarbs($request->getAttribute('carbs'));
            }
            if($request->hadAttribute('fat'))
            {
                $changeFlag = true;
                $this->getNutrition()->setFat($request->getAttribute('fat'));
            }
            if($request->hadAttribute('salt'))
            {
                $changeFlag = true;
                $this->getNutrition()->setSaly($request->getAttribute('salt'));
            }
            if($request->hadAttribute('quantity'))
            {
                $changeFlag = true;
                $this->getNutrition()->setQuantity($request->getAttribute('quantity'));
            }

            if($changeFlag)
            {
                $this->getNutrition()->update();
            } else {
                $this->setResponse(400, ['message' => 'No Attributes to edit']);
            }

            $this->setResponse(201, "Category Updated", $this->getCategory()->toArray());
        }
     }
?>