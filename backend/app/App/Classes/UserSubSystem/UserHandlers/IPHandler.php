<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;
use App\Classes\UserSubSystem\UserIP;

class IPHandler extends UserHelper {

    private $allowed;

    public function __construct($db, $user)
    {
        parent::__construct($db);
        $this->setAllowed(false);
        $this->setUser($user);
        $this->setTable("users");
    }

    public function verifyIP($verifiedIP) {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());
        if($ip->checkForIp($ip)) {
            $this->getDb()->createUpdate()->table("user_ips")
            ->set(["allowed" => 1])
            ->where(["user_id = " . $this->getUser()->getId(), "ip_address = '" . $verifiedIP . "'"])->execute();
            $this->allowed = true;
            return true;
        } else {
            return false;
        }
    }

    public function checkForIP($confirmed = false) {
        $ip = new UserIP($this->getDb());
        $ip->setUser($this->getUser());

        if($ip->checkForIp($ip)){
            $this->allowed = true;
            return true;
        } else if($confirmed) {
            $this->allowed = true;
            $ip->addIP();
            return false;
        }
        $this->getUser()->getEmailHandler()->sendEmailToken('ip_verification');
        return false;
    }

    public function isIPAllowed($ip) {
        $uip = new UserIP($this->getDb());
        $uip->setUser($this->getUser());
        $allowed = $uip->isIPAllowed($ip);
        $this->setAllowed($allowed);
        return $allowed;
    }

    public function isAllowed()
    {
        return $this->allowed;
    }

    public function setAllowed($allowed)
    {
        $this->allowed = $allowed;
    }
}