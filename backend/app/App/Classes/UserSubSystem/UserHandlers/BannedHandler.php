<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;

class BannedHandler extends UserHelper {

    private $banned;

    public function __construct($db, $user)
    {
        parent::__construct($db);
        $this->setUser($user);
        $this->setTable("users");
        $banned = false;
    }

    public function isBanned()
    {
        return $this->banned;
    }

    public function setBanned($banned)
    {
        $this->banned = $banned;
    }
}