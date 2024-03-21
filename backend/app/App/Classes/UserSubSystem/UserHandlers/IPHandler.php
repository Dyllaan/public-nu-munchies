<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;
use App\Classes\UserSubSystem\UserIP;
/**
 * @author Louis Figes W21017657
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

    public function isIPAllowed() {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());

        if($ip->isAllowed($_SERVER['REMOTE_ADDR'])){
            return true;
        } else {
            $this->getUser()->getEmailHandler()->sendEmailToken('ip_verification');
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

    public function isAllowed() {
        return $this->allowed;
    }

    public function setAllowed($allowed) {
        $this->allowed = $allowed;
    }
}