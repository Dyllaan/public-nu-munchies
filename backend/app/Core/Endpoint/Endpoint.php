<?php
/**
 * Endpoint is the class that all endpoints extend from
 * @author Louis Figes
 */
namespace Core\Endpoint;

use Core\Endpoint\EndpointBase;
use Core\Util\EndpointUtil;
use Core\Endpoint\SubEndpoint\SubEndpointHandler;
use Core\Database\Database;

abstract class Endpoint extends EndpointBase
{
    private $subEndpointHandler;
    private $request;

    public function __construct($method, $url) 
    {
        parent::__construct();
        $this->setMethod($method);
        $this->setUrl($url);
        $this->subEndpointHandler = new SubEndpointHandler();
    }

    public function getSubEndpointHandler() {
        return $this->subEndpointHandler;
    }

    public function addSubEndpoint($subEndpoint) {
        $this->getSubEndpointHandler()->addSubEndpoint($subEndpoint);
    }

    public function setRequest($request) {
        $this->request = $request;
    }

    public function getRequest() {
        return $this->request;
    }
}