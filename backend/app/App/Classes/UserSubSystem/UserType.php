<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;
use App\Classes\UserSubSystem\UserAddon;

abstract class UserType extends UserAddon
{

    public function __construct($db, $table)
    {
        parent::__construct($db, $table);
    }

    public function is()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["user_id = '" . $this->getUser()->getId() . "'"])->execute();
        return count($data) > 0;
    }
}
