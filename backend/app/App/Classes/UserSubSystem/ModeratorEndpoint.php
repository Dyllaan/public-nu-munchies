<?php
/**
 * Endpoint is the class that moderator endpoints should extend
 * @author Louis Figes
 */
namespace App\Classes\UserSubSystem;

use Core\Endpoint\Endpoint;
use Core\Util\EndpointUtil;
use Core\Endpoint\SubEndpoint\SubEndpointHandler;

abstract class ModeratorEndpoint extends Endpoint
{

    private $moderator;

    public function __construct($method, $url) 
    {
        parent::__construct($method, $url);
    }

    public function createAndCheckForModerator($user)
    {
        $this->moderator = new Moderator($this->getDb());
        if (!$this->moderator->isModerator()) {
            $this->setResponse(403, 'You do not have permission to access this resource');
            return false;
        }
        return true;
    }

    public function process($request) {
        parent::process($request);
        $this->createAndCheckForModerator();
    }
}