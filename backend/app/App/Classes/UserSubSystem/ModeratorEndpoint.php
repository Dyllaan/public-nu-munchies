<?php
/**
 * Endpoint is the class that moderator endpoints should extend
 * @author Louis Figes
 */
namespace Core\Endpoint;

use Core\Endpoint\Endpoint;
use Core\Util\EndpointUtil;
use Core\Endpoint\SubEndpoint\SubEndpointHandler;
use Core\Database\Database;

abstract class ModeratorEndpoint extends Endpoint
{

    private $moderator;

    public function __construct($method, $url) 
    {
        parent::__construct();
        $this->setMethod($method);
        $this->setUrl($url);
        $this->subEndpointHandler = new SubEndpointHandler();
    }
}