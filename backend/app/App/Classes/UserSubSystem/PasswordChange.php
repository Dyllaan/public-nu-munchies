<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;
use App\Classes\UserSubSystem\UserAddon;
use App\Classes\Business;

class PasswordChange extends UserAddon
{

    //hashed with BCRYPT
    private $password;

    private $token;

    public function __construct($db)
    {
        parent::__construct($db, 'password_change_requests');
    }

    public function insertRequest()
    {
        $password = password_hash($this->getPassword(), PASSWORD_BCRYPT);
        $this->getDb()->createInsert()->into($this->getTable())->
            cols('user_id, token, password')->values([$this->getUser()->getId()
            , $this->getToken(), $password])->execute();
    }

    public function getFromToken($token)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["token = '" . $token . "'", "user_id = " . $this->getUser()->getId()])->execute();
        if(count($data) > 0) {
            $this->setPassword($data[0]['password']);
            return true;
        }
        return false;
    }

    public function changePassword() {
        try {
            $this->getDb()->createUpdate()->table('passwords')
            ->set(['password' => $this->getPassword()])->where(["user_id = '" . $this->getUser()->getId() . "'"])->execute();
            $this->getUser()->get();
            $this->setResponse(200, 'Password changed successfully', $this->getUser()->toArray());
        } catch (\Exception $e) {
            $this->setResponse(500, "An error occurred: " . $e->getMessage());
        }
        $this->setResponse(400, "Password reset failed");
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setToken($token)
    {
        $this->token = $token;
    }

    public function getToken()
    {
        return $this->token;
    }
}
