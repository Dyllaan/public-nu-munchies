<?php

/**
 * class EndpointManager
 * Just to add endpoint to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

use App\Endpoints\UserEndpoint;
use Core\Manager;
use Core\HTTP\Classes\Request;
use App\Endpoints\UBIntegration\ItemUpload;
use App\Endpoints\UBIntegration\ItemReserve;
use App\Endpoints\UBIntegration\OrderCancel;
use App\Endpoints\UBIntegration\OrderCollect;
use App\Endpoints\UBIntegration\OrderItem;
use App\Endpoints\UBIntegration\ApproveReview;
use App\Endpoints\UBIntegration\InsertReview;
use App\Endpoints\UBIntegration\DeleteReview;
use App\Endpoints\UBIntegration\CheckoutItem;

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
        $this->addEndpoint(new ItemUpload());
        $this->addEndpoint(new ItemReserve());
        $this->addEndpoint(new OrderCancel());
        $this->addEndpoint(new OrderItem());
        $this->addEndpoint(new InsertReview());
        $this->addEndpoint(new ApproveReview());
        $this->addEndpoint(new DeleteReview());
        $this->addEndpoint(new CheckoutItem());

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
