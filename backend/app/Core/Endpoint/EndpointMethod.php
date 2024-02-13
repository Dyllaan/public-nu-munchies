<?php

/**
 * Runs a specific HTTP request method for an endpoint
 * this reduces clutter in the endpoint class and increases abstraction
 * @author Louis Figes
 */

namespace App\Classes\Endpoint;

use Core\HTTP\Classes\GivesResponse;

abstract class EndpointMethod extends GivesResponse
{
    protected $request;
    protected $db;
    
    public function __construct($request, $db) 
    {
        $this->request = $request;
        $this->db = $db;
    }

    public abstract function process();

    public function getRequest() 
    {
        return $this->request;
    }

    public function getDb() 
    {
        return $this->db;
    }
}

