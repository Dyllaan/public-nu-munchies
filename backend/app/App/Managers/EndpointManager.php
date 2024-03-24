<?php

/**
 * class EndpointManager
 * Just to add endpoint to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

//use App\Endpoints\NutritionEndpoint;
//use App\Endpoints\CatEndpoint;
use App\Endpoints\UFIntegration\AllNutrition;
use App\Endpoints\UFIntegration\RemoveNutrition;
use App\Endpoints\UFIntegration\RemoveCat;
use App\Endpoints\UFIntegration\GetNutrition;
use App\Endpoints\UFIntegration\EditNutrition;
use App\Endpoints\UFIntegration\EditCat;
use App\Endpoints\UFIntegration\GetCat;
use App\Endpoints\UFIntegration\AddNutrition;
use App\Endpoints\UserSubSystem\UserEndpoint;
use App\Endpoints\UFIntegration\AddCat;
use App\Endpoints\BusinessSubsystem\BusinessEndpoint;
use App\Endpoints\BusinessSubsystem\BItemEndpoint;
use App\Endpoints\UserSubSystem\OAuthCallback;
use App\Endpoints\UserSubSystem\ForgotPassword;
use App\Endpoints\UserSubSystem\ResetPassword;
use App\Endpoints\UserSubSystem\Mod\IsMod;
use App\Endpoints\UserSubSystem\Councillor\IsCouncillor;
use App\Endpoints\Search;
use Core\Manager;
use Core\HTTP\Classes\Request;
use App\Endpoints\UBIntegration\ItemReserve;
use App\Endpoints\UBIntegration\OrderCancel;
use App\Endpoints\UBIntegration\OrderCollect;
use App\Endpoints\UBIntegration\InsertOrder;
use App\Endpoints\UBIntegration\InsertReview;
use App\Endpoints\UBIntegration\CheckoutItem;
use App\Endpoints\UBIntegration\Webhook;
use Core\ClientErrorException;
use App\Endpoints\UBIntegration\GetItems;
use App\Endpoints\UBIntegration\GetReviews;
use App\Endpoints\UserSubSystem\IP\AllIPs;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This class is where all endpoints need to be added to be supported by the APIs
 */
class EndpointManager extends Manager
{

    private $request;

    public function __construct()
    {
        parent::__construct();
        $this->allocate();
    }

    public function getRequest()
    {
        if ($this->request == null) {
            return new Request($_SERVER['REQUEST_METHOD']);
        } else {
            return $this->request;
        }
    }

    protected function add()
    {
        //$this->addEndpoint(new NutritionEndpoint());
        //$this->addEndpoint(new CatEndpoint());
        $this->addEndpoint(new AllNutrition());
        $this->addEndpoint(new RemoveNutrition());
        $this->addEndpoint(new RemoveCat());
        $this->addEndpoint(new EditNutrition());
        $this->addEndpoint(new GetNutrition());
        $this->addEndpoint(new EditCat());
        $this->addEndpoint(new GetCat());
        $this->addEndpoint(new AddNutrition());
        $this->addEndpoint(new AddCat());
        /**
         * Users subsystem
         */
        $this->addEndpoint(new UserEndpoint());
        $this->addEndpoint(new BusinessEndpoint());
        $this->addEndpoint(new OAuthCallback());
        $this->addEndpoint(new ForgotPassword());
        $this->addEndpoint(new ResetPassword());
        $this->addEndpoint(new UserEndpoint());
        $this->addEndpoint(new IsMod());
        $this->addEndpoint(new AllIPs());
        $this->addEndpoint(new Search());


        $this->addEndpoint(new ItemReserve());
        $this->addEndpoint(new OrderCancel());
        $this->addEndpoint(new InsertOrder());
        $this->addEndpoint(new Webhook());
        $this->addEndpoint(new GetItems());
        $this->addEndpoint(new CheckoutItem());
        $this->addEndpoint(new InsertReview());
        $this->addEndpoint(new GetReviews());
        $this->addEndpoint(new OrderCollect());
    }

    public function addEndpoint($endpoint)
    {
        $this->addItemWithKey($endpoint->getUrl(), $endpoint);
    }

    /*public function allocate()
    {
        if ($this->hasKey($this->getRequest()->getMainEndpoint())) {
            $endpoint = $this->getItem($this->getRequest()->getMainEndpoint());
            $handler = $endpoint->getSubEndpointHandler();
            if ($handler->hasSubEndpoint($this->getRequest()->getSubEndpoint())) {
                $subEndpoint = $handler->getSubEndpoint($this->getRequest()->getSubEndpoint());
                $subEndpoint->process($this->getRequest());
            } else {
                if($this->getRequest()->getRequestMethod() == $endpoint->getMethod()) {
                    $endpoint->process($this->getRequest());
                } else {
                    $this->setResponse(405, 'Method not allowed', ['method' => $this->getRequest()->getRequestMethod()]);
                }
            }
        } else {
            $this->setResponse(404, 'Endpoint not found', ['endpoint' => $this->getRequest()->getMainEndpoint()]);
        }
    }*/

    public function allocate()
    {
        if ($this->hasKey($this->getRequest()->getMainEndpoint())) {
            $mainEndpoint = $this->getItem($this->getRequest()->getMainEndpoint());
            $endpointToRun = null;
            if ($this->wasSubEndpointRequested()) {
                $handler = $mainEndpoint->getSubEndpointHandler();
                if ($handler->hasSubEndpoint($this->getRequest()->getSubEndpoint())) {
                    $endpointToRun = $handler->getSubEndpoint($this->getRequest()->getSubEndpoint());
                } else {
                    throw new ClientErrorException(404, ['sub-endpoint' => $this->getRequest()->getSubEndpoint()]);
                }
            } else {
                $endpointToRun = $this->getItem($this->getRequest()->getMainEndpoint());
            }

            if ($endpointToRun != null) {
                $this->checkEndpointMethod($endpointToRun);
                $this->runEndpoint($endpointToRun);
            } else {
                throw new ClientErrorException(404, ['endpoint' => $this->getRequest()->getMainEndpoint()]);
            }
        } else {
            throw new ClientErrorException(404, ['endpoint' => $this->getRequest()->getMainEndpoint()]);
        }
    }

    public function wasSubEndpointRequested()
    {
        return $this->getRequest()->getSubEndpoint() != null;
    }

    public function runEndpoint($endpoint)
    {
        $endpoint->process($this->getRequest());
    }

    private function checkEndpointMethod($endpoint)
    {
        if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
            $this->setResponse(200, 'Pre-flight ok');
        }
        if ($endpoint->getMethod() != $this->getRequest()->getRequestMethod()) {
            throw new ClientErrorException(405, ['allowed' => $endpoint->getMethod(), 'requested' => $this->getRequest()->getRequestMethod()]);
        }
    }
}
