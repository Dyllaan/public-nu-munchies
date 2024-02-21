<?php

namespace Core\Endpoint\SubEndpoint;

use Core\HTTP\Classes\GivesResponse;

class SubEndpointHandler extends GivesResponse
{
    private $subEndpoints;

    public function __construct()
    {
        $this->subEndpoints = [];
    }

    public function addSubEndpoint($subEndpoint)
    {
        $this->subEndpoints[] = $subEndpoint;
    }

    public function getSubEndpoints()
    {
        return $this->subEndpoints;
    }

    public function getSubEndpoint($subEndpointName)
    {
        foreach ($this->subEndpoints as $subEndpoint) {
            if ($subEndpoint->getUrl() === $subEndpointName) {
                return $subEndpoint;
            }
        }
        return null;
    }

    public function hasSubEndpoint($subEndpointName)
    {
        foreach ($this->subEndpoints as $subEndpoint) {
            if ($subEndpoint->getUrl() === $subEndpointName) {
                return true;
            }
        }
        return false;
    }

    public function setSubEndpoints($subEndpoints)
    {
        $this->subEndpoints = $subEndpoints;
    }
}
