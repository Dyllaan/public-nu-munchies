<?php

namespace App\Classes\UserSubSystem\UserHandlers;

use App\Classes\UserSubSystem\EmailToken;
use App\Classes\UserSubSystem\UserHelper;
use App\Classes\UserSubSystem\User;
use App\Classes\UserSubSystem\PasswordChange;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Handles sending and verifying email tokens for the user
 */
class EmailHandler extends UserHelper
{

    private $db;

    public function __construct($db, $user)
    {
        $this->setDb($db);
        $this->setUser($user);
    }

    /**
     * Has to be created to allow for email changes as the current logic
     * isnt secure or built to handle this.
     */
    public function changeEmail($newEmail) {
        $user = new User($this->getDb());
        $user->setEmail($newEmail);
        if($user->doesUserExistAtEmail($newEmail)) {
            $this->setResponse(400, 'Email already in use');
            return;
        } else {
            $this->sendEmailToken('change_email', $newEmail);
        }
    }


    public function sendEmailToken($type, $newEmail = null, $newPassword = null, $ip = null)
    {
        if(!$this->getUser()->exists()) {
            return;
        }

        $this->getUser()->get();

        if($type === 'email_verification' && $this->getUser()->getVerifiedHandler()->isVerified()) {
            $this->setResponse(400, 'User is already verified');
            return;
        }

        if($type === 'change_email') {
            $user = new User($this->getDb());
            $user->setEmail($newEmail);
            if($user->exists()) {
                $this->setResponse(400, 'Email already in use');
                return;
            }
        }

        $emailToken = new EmailToken($this->getDb(), $type);
        $emailToken->setUser($this->getUser());
        if($type === 'ip_verification') {
            $emailToken->setIP($ip);
        }
        try {
            $jwt = $emailToken->sendEmail($newEmail);
            if($type === 'change_password') {
                $password = new PasswordChange($this->getDb());
                $password->setUser($this->getUser());
                $password->setToken($jwt);
                $password->setPassword($newPassword);
                $password->insertRequest();
            }
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
                    $this->getUser()->getVerifiedHandler()->verifyUser();
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'password_reset':
                if($emailToken->validate($token)) {
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'ip_verification':
                if($emailToken->validate($token)) {
                    $this->getUser()->getIPHandler()->addIP($emailToken->getIP());
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'change_email':
                if($emailToken->validate($token)) {
                    $this->getUser()->setEmail($emailToken->getEmail());
                    $this->getUser()->update(false, false);
                    $this->getUser()->getVerifiedHandler()->verifyUser(0, false);
                    $this->getUser()->getEmailHandler()->sendEmailToken('email_verification');
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'change_password':
                if($emailToken->validate($token)) {
                    $passwordChange = new PasswordChange($this->getDb());
                    $passwordChange->setUser($this->getUser());
                    if(!$passwordChange->getFromToken($token)) {
                        $this->setResponse(400, 'Password reset failed');
                        return;
                    }
                    $passwordChange->changePassword();
                    return true;
                } else {
                    $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
                }
                break;
            case 'delete_account':
                if($emailToken->validate($token)) {
                    $this->getUser()->delete();
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