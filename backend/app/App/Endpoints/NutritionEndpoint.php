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
            $this->addSubEndpoint(new AddNutrition('POST', 'addnutrition'));
            $this->addSubEndpoint(new EditNutrition('PUT', 'editnutrition'));
            $this->addSubEndpoint(new RemoveNutrition('DELETE', 'removenutrition'));
            $this->setRequiresAuth(true);
        }
        public function process($request)
        {
            parent::process($request);
            $nutrition = Nutrition::getInstance($this->getDb());
            $this->setResponse(200, 'Nutrition Taken', $nutrition->toArray());
        }
    }
?>