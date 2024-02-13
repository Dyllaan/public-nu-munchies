<?php
/**
 * Allows the current user to be retrieved, edited and deleted
 * @author Louis Figes
 * @generated This class was created using Github Copilot
 */
namespace App\Endpoints;

use App\Classes\User;
use \App\Endpoints\Users\RegisterUser;
use \App\Endpoints\Users\EditUser;
use \App\Endpoints\Users\LoginUser;
use Core\Endpoint\Endpoint;

class UserEndpoint extends Endpoint 
{

    public function __construct() 
    {
        parent::__construct();
        $this->addSubEndpoint(new RegisterUser($this->getDb()));
        $this->addSubEndpoint(new EditUser($this->getDb()));
        $this->addSubEndpoint(new LoginUser($this->getDb()));
    }

    public function process($request) {
        $user = User::getInstance($this->getDb());
        $user->verifyToken();
        $this->setResponse(200, 'User retrieved', $user->toArray());
    }
}