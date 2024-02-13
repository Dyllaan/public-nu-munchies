<?php
/**
 * 
 * @author Louis Figes
 */
include_once 'config/autoloader.php';
include_once 'config/ExceptionHandler.php';

use App\Managers\MiddlewareManager;
use App\Managers\EndpointManager;

class API
{
    private $endpointManager;
    private $middlewareManager;

    public function __construct()
    {
        ExceptionHandler::register();
        autoloaderRegister();
        $this->middlewareManager = new MiddlewareManager();
        $this->endpointManager = new EndpointManager();
    }
}
