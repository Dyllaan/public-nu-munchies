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

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}
