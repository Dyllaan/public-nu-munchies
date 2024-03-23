<?php

/**
 * class MiddlewareManager
 * Just to add middleware to the application, to prevent the router file being updated too often
 */

namespace App\Managers;

use Core\Manager;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * This class is responsible for adding middleware to the application
 * Currently theres only sanitisation to ensure safe data is entered
 * this wont allow any data to be entered that could be harmful to the system
 * and cancels the request so all endpoints are automatically slightly more secure
 * As well as CORS middleware which just outputs headers to allow OPTIONS and pre-flight requests from the browser.
 */
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
