<?php
    /**
     * class CatEndpoint
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Allows the added, edit, remove to a specific nutrition.
     */
    namespace App\Endpoints;

    use \App\Classes\Nutrition;
    use \App\Endpoints\UFIntegration\AddNutrition;
    use \App\Endpoints\UFIntegration\EditNutrition;
    use \App\Endpoints\UFIntegration\RemoveNutrition;
    use Core\Endpoint\Endpoint;

    class NutritionEndpoint extends Endpoint
    {
        public function __construct()
        {
            parent::__construct('GET', 'nutrition');
            $this->addSubEndpoint(new AddNutrition());
            $this->addSubEndpoint(new EditNutrition());
            $this->addSubEndpoint(new RemoveNutrition());
        }
        public function process($request)
        {
            parent::process($request);
            $nutritionInstance = Nutrition::getInstance($this->getDb());
            if ($nutritionInstance) {
                $this->setResponse(200, 'Nutrition Taken', $nutritionInstance->toArray());
            } else {
                $this->setResponse(500, 'Error: Nutrition instance not available.');
            }
        }

    }
?>