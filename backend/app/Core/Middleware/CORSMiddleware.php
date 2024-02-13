<?php
/**
 * The aim of this class it to sanitise any parameters or variables BEFORE the program uses them inspired by Laravel's middleware
 * I think this is the best solution as it avoids doing it in each endpoint and it seems more secure this way
 * @author Louis Figes
 * @generated Github Copilot was used during the creation of this code
 */

namespace Core\Middleware;

class CORSMiddleware
{
    
    public function __construct() 
    {
        $this->handle();
    }

    public function handle() 
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}