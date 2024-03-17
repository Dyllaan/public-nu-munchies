<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\EmailToken;
use App\Classes\UserSubSystem\UserHelper;

class EmailHandler extends UserHelper
{

    private $db;

    public function __construct($db, $user)
    {
        $this->setDb($db);
        $this->setUser($user);
    }

    public function sendEmailToken($type)
    {
        if(!$this->getUser()->exists()) {
            return;
        }

        if($type === 'email_verification' && $this->isVerified()) {
            $this->setResponse(400, 'User is already verified');
            return;
        }

        $emailToken = new EmailToken($this->getDb(), $type);
        $emailToken->setUser($this->getUser());
        try {
            $emailToken->sendEmail();
            return true;
        } catch (\Exception $e) {
            $this->setResponse(400, 'Error sending email', ['error' => $e->getMessage()]);
        }
    }

    public function verifyEmailToken($token, $type)
    {
        $emailToken = new EmailToken($this->getDb(), $type);
        $emailToken->setUser($this->getUser());
        switch($type) {
            case 'email_verification':
                if($emailToken->validate($token)) {
                    $this->getUser()->getVerificationHandler()->verifyUser();
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'password_reset':
                if($emailToken->validate($token)) {
                    $this->setId($emailToken->getUserId());
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'ip_verification':
                if($emailToken->validate($token)) {
                    $this->getUser()->getIPHandler()->verifyIP($emailToken->getIP());
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
        }
    }

    public function setDb($db)
    {
        $this->db = $db;
    }

    public function getDb()
    {
        return $this->db;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}