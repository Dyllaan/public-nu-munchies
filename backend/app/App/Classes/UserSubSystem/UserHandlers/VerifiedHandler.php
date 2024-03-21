<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;

class VerifiedHandler extends UserHelper {

    private $verified;

    public function __construct($db, $user)
    {
        parent::__construct($db);
        $this->setUser($user);
        $this->setTable("users");
    }

    public function verifyUser($verified = 1, $respond = true) {
        if(!$this->getUser()->exists()) {
            $this->setResponse(400, "User does not exist");
        }
        if($verified == 1 && $this->isVerified()) {
            $this->setResponse(400, "User is already verified");
        }
        $this->getUser()->get();
        $this->getDb()->createUpdate()->table($this->getTable())->set(['verified' => $verified])->where(["id = '" . $this->getUser()->getId() . "'"])->execute();
        $this->setVerified($verified);
        if($respond) {
            $this->setResponse(200, "Verified User", $this->getUser()->toArray());
        }
    }

    public function isVerified()
    {
        return $this->verified;
    }

    public function setVerified($verified)
    {
        $this->verified = $verified;
    }
}