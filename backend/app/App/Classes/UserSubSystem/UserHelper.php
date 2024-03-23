<?php

namespace App\Classes\UserSubSystem;

use Core\Database\CrudModel;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Used by the UserType class
 */
abstract class UserHelper extends CrudModel {

    private $user;

    protected function getUser() {
        return $this->user;
    }

    protected function setUser($user) {
        $this->user = $user;
    }
}