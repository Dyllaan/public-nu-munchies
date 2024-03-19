<?php

namespace App\Classes\UserSubSystem;

use Core\Database\CrudModel;

abstract class UserHelper extends CrudModel {

    private $user;

    protected function getUser() {
        return $this->user;
    }

    protected function setUser($user) {
        $this->user = $user;
    }
}