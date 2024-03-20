<?php
/**
 * @author Louis Figes W21017657
 * This class is responsible for handling the PUT request to the /Users endpoint
 * I put this in its own class just to reduce clutter in the user endpoint class and for increases abstraction
 */
namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use App\Classes\UserSubSystem\User;

class EditUser extends SubEndpoint
{

    public function __construct() 
    {
        parent::__construct('PUT', 'edit');
        $this->getAttributes()->addAllowedStrings(['first_name', 'last_name']);
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);
        $changeFlag = false;
        
        $attributes = $request->getAttributes();
        if($attributes === null || empty($attributes)) {
            $this->setResponse(400, "No attributes given", ['hint'=>'You must use JSON format for PUT as it doesnt support form data']);
        }
        if($request->hasAttribute('first_name')) {
            $changeFlag = true;
            $this->getUser()->setFirstName($request->getAttribute('first_name'));
        }
        if($request->hasAttribute('last_name')) {
            $changeFlag = true;
            $this->getUser()->setLastName($request->getAttribute('last_name'));
        } 

        if($changeFlag) {
            $this->getUser()->update();
        } else {
            $this->setResponse(400, "No attributes given");
        }

        $this->setResponse(201, "Profile updated", $this->getUser()->toArray()); 
    }
}