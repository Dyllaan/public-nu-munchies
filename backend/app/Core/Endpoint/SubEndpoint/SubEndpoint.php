<?php

/**
 * class SubEndpoint
 * Runs a specific sub endpoint
 * this reduces clutter in the endpoint class and increases abstraction
 */

namespace Core\Endpoint\SubEndpoint;

use Core\Endpoint\EndpointBase;

class SubEndpoint extends EndpointBase
{
    public function __construct($method, $url)
    {
        parent::__construct();
        $this->setMethod($method);
        $this->setUrl($url);
    }
}
