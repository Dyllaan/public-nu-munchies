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
        $this->addItemWithKey('user', new UserEndpoint());
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
                $endpoint->process($this->getRequest());
            }
        } else {
            $this->setResponse(404, 'Endpoint not found', ['endpoint' => $this->getRequest()->getMainEndpoint()]);
        }
    }
}
