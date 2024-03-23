<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\UserHelper;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles the verification of a user, this keeps it out of User which is already too large
 */
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