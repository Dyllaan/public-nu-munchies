<?php

namespace App\Classes;

use Firebase\JWT\JWT;
use Core\Database\CrudModel;
use Core\Database\CrudInterface;

class Password extends CrudModel
{
    private $user_id;

    public function __construct($db)
    {
        parent::__construct($db);
    }

    public function isCorrect($passwordGiven) {
        if($this->getUserId() == null) {
            $this->setResponse(400, "User ID not set");
            return false;
        }
        $data = $this->getDb()->createSelect()->cols("*")->from("passwords")->where(["user_id = '" . $this->getUserId() . "'"])->execute();
        if (count($data) == 0) {
            return false;
        } else {
            if (password_verify($passwordGiven, $data[0]['password'])) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    public function getUserId()
    {
        return $this->user_id;
    }
}