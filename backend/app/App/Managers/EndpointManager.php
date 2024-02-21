<?php

/**
 * class EndpointManager
 * Just to add endpoint to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

use App\Endpoints\UserEndpoint;
use Core\Manager;
use Core\HTTP\Classes\Request;

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
    }

    public function addEndpoint($endpoint)
    {
        $this->addItemWithKey($endpoint->getUrl(), $endpoint);
    }

    public function allocate()
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
    }
}
