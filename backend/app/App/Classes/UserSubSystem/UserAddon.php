<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;
use Core\Database\CrudModel;

abstract class UserAddon extends CrudModel
{
    private \AppConfig $appConfigInstance;
    private $user;

    public function __construct($db, $table)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable($table);
    }

    public function is()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["user_id = '" . $this->getUser()->getId() . "'"])->execute();
        return count($data) > 0;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}
