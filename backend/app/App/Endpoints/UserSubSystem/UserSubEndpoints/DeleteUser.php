<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the PUT request to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\UserSubSystem\User;

class DeleteUser extends SubEndpoint
{

    public function __construct() 
    {
        parent::__construct('DELETE', 'delete');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $changeFlag = false;
        
        $attributes = $request->getAttributes();
        $this->setResponse(201, "Profile deleted", $this->getUser()->delete()); 
    }
}