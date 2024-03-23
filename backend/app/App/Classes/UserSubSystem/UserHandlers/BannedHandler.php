<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles the banning status of a user, this keeps it out of User which is already too large
 */
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