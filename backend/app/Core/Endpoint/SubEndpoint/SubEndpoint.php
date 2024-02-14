<?php

/**
 * class SubEndpoint
 * Runs a specific sub endpoint
 * this reduces clutter in the endpoint class and increases abstraction
 */

namespace Core\Endpoint\SubEndpoint;

use Core\HTTP\Classes\GivesResponse;
use Core\Endpoint\Attributes\EndpointAttributes;

class SubEndpoint extends GivesResponse
{
    protected $db;
    protected $method;
    protected $name;
    protected $attributes;

    public function __construct($db, $method, $name)
    {
        $this->db = $db;
        $this->method = $method;
        $this->name = $name;
        $this->attributes = new EndpointAttributes();
    }

    public function process($request)
    {
        $this->getAttributes()->validate($request->getAttributes());
    }

    public function getDb()
    {
        return $this->db;
    }

    public function getMethod()
    {
        return $this->method;
    }

    public function getName()
    {
        return $this->name;
    }

    protected function setMethod($method)
    {
        $this->method = $method;
    }

    protected function setName($name)
    {
        $this->name = $name;
    }

    protected function getAttributes()
    {
        return $this->attributes;
    }
}
