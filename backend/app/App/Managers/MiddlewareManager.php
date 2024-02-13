<?php

/**
 * @author Louis Figes W21017657
 * 
 * Just to add middleware to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

use Core\Manager;

class MiddlewareManager extends Manager
{

    public function __construct() 
    {
        parent::__construct();
    }

    protected function add()
    {
        $this->addItem(new \Core\Middleware\SanitiseMiddleware());
        $this->addItem(new \Core\Middleware\CORSMiddleware());
    }
}