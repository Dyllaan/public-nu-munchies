<?php
/**
 * Endpoint is the class that all endpoints extend from
 * @author Louis Figes
 */
namespace Core\Endpoint;

use Core\HTTP\Classes\GivesResponse;
use Core\Util\EndpointUtil;
use Core\Endpoint\SubEndpoint\SubEndpointHandler;
use Core\Database\Database;

abstract class Endpoint extends GivesResponse
{
    private $db;
    private $subEndpointHandler;
    private $request;

    public function __construct() 
    {
        $this->setupDatabase();
        $this->subEndpointHandler = new SubEndpointHandler();
    }
    
    abstract public function process($request);

    protected function setDB($dbName) 
    {
        $this->db = new Database($dbName);
    }

    protected function setupDatabase() 
    {
        $this->setDB('nu-munchies.db');
    }

    public function getDb() {
        return $this->db;
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