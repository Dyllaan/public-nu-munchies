<?php
    /**
     * class AddFood
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * This class is used to add the foods nutrients such as calories,
     * weight, salt, fat, protein, etc. This will allow the user to be 
     * able to track the exact amount of food that they are consuming and
     * the amount of nutrients that they are also consuming.
     */

     namespace App\Endpoints\UFIntegration;

    use Core\Endpoint\Endpoint;
    use App\Classes\Nutrition;

    class AddNutrition extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('POST', 'addnutrition');
            $this->setRequiresAuth(true);
            $this->getAttributes()->addRequiredStrings(['food_name']);
            $this->getAttributes()->addRequiredInts(['weight', 'calories', 'protein', 'carbs', 'fat', 'salt', 'quantity']);
        }

        public function process($request)
        {
            parent::process($request);
            //var_dump($request->getAttributes());
            //$nutrition = Nutrition::getInstance($this->getDb());
            $nutrition = new Nutrition($this->getDb());

            $nutrition->setFoodName($request->getAttribute('food_name'));
            $nutrition->setWeight($request->getAttribute('weight'));
            $nutrition->setCalories($request->getAttribute('calories'));
            $nutrition->setProtein($request->getAttribute('protein'));
            $nutrition->setCarbs($request->getAttribute('carbs'));
            $nutrition->setFat($request->getAttribute('fat'));
            $nutrition->setSalt($request->getAttribute('salt'));
            $nutrition->setQuantity($request->getAttribute('quantity'));
            $nutrition->save();
            $this->setResponse(200, 'Food Nutrients Created', $nutrition->toArray());
        }
    }
?>