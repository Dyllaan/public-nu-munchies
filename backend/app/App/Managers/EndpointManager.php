<?php

/**
 * class EndpointManager
 * Just to add endpoint to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

use App\Endpoints\UserEndpoint;
use App\Endpoints\UFIntegration\AddCat;
use App\Endpoints\BusinessSubsystem\BusinessEndpoint;
use App\Endpoints\OAuthCallback;
use Core\Manager;
use Core\HTTP\Classes\Request;
use Core\ClientErrorException;

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
        $this->addEndpoint(new UserEndpoint());
        $this->addEndpoint(new AddCat());
        $this->addEndpoint(new BusinessEndpoint());
        $this->addEndpoint(new OAuthCallback());
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
