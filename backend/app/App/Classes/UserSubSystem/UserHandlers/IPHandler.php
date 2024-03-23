<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;
use App\Classes\UserSubSystem\UserIP;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles the IP verification of a user, this keeps it out of User which is already too large
 */
class IPHandler extends UserHelper {
    
    public function __construct($db, $user)
    {
        parent::__construct($db);
        $this->setUser($user);
        $this->setTable("users");
    }

    public function addIP($verifiedIP) {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());
        $ip->addIP($verifiedIP);
    }

    public function isIPAllowed($ipAddr) {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());

        if($ip->isAllowed($ipAddr)){
            return true;
        } else {
            return false;
        }
    }

    public function getAll() {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());
        return $ip->getAll();
    }

    public function removeIP($ipAddr) {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());
        return $ip->removeIP($ipAddr);
    }
}