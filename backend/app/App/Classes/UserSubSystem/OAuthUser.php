<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;

class OAuthUser extends User
{

    private \AppConfig $appConfigInstance;
    private $oAuthId;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable('oauth_users');
    }

    public static function getInstance($db)
    {
        if (self::$instance === null) {
            self::$instance = new self($db);
        }
        return self::$instance;
    }

    public function register()
    {
        if ($this->exists()) {
            $this->setResponse(400, "User already exists");
        } else {
            $this->save();
        }
    }

    public function login()
    {
        if(!$this->isOAuthEmail()) {
            $this->setResponse(401, "This email is not registered as OAuth, please delete your account and re-register via Google.");
        } else {
            $this->setResponse(200, 'Login Successful', $this->toArray());
        }
    }

    public function delete()
    {
        $this->getDb()->beginTransaction();
        try {
            $id = $this->getDb()->createDelete()->from('users')->where(["id = '" . $this->getId() . "'"])->execute();
            if ($id != null) {
                $this->getDb()->createDelete()->from('oauth_users')->where(["user_id = '" . $this->getId() . "'"])->execute();
                // commit the changes as there were no errors
                $this->getDb()->commit();
                $this->setId($id);
                return $this->toArray();
            } else {
                $this->getDb()->rollBack();
                $this->setResponse(400, "User could not be deleted");
            }
        } catch (\Exception $e) {
            $this->getDb()->rollBack();
            $this->setResponse(500, "An error occurred: " . $e->getMessage());
        }
    }

    private function isOAuthEmail()
    {
        $subQuery = $this->getDb()->createSelect()->cols("*")->from("oauth_users")->join('users', 'oauth_users.user_id = users.id')->where(["users.email = '" . $this->getEmail() . "'"])->assemble();
        $data = $this->getDb()->createSelect()->exists($subQuery, "oauth")->execute();
        return $data[0]['oauth'];
    }

    public function exists()
    {
        if($this->doesExist()) {
            return $this->doesExist();
        }
        if ($this->getEmail() != null) {
            $data = $this->getFromEmail();
            if($data != null) {
                $this->setId($data[0]['id']);
                $this->setUserFields($data[0]);
                return true;
            }
        } elseif ($this->getId() != null) {
            $data = $this->getFromUserId();
            if($data != null) {
                $this->setUserFields($data[0]);
                return true;
            }
        } else if ($this->getOAuthId() != null) {
            $data = $this->getFromOAuthId();
            if (count($data) > 0) {
                $this->setId($data[0]['user_id']);
                $this->setUserFields($data[0]);
                return true;
            }
        }
        return false;
    }

    public function setUserFields($data)
    {
        if(count($data) == 0) {
            return;
        }
        $this->setFirstName($data['first_name']);
        $this->setLastName($data['last_name']);
        $this->setEmail($data['email']);
        $this->getVerifiedHandler()->setVerified($data['verified']);
        $this->setCreatedAt($data['created_at']);
        $this->setExists(true);
    }


    public function save()
    {
        $this->getDb()->beginTransaction();
        try {
            $id = $this->getDb()->createInsert()->into('users')->cols('first_name, last_name, email, verified')->values([$this->getFirstName(), $this->getLastName(), $this->getEmail(), 1])->execute();
            if ($id != null) {
                $this->getDb()->createInsert()->into('oauth_users')->cols('id, user_id, provider_id')->values([$this->getOAuthId(), $id, 2])->execute();
                // commit the changes as there were no errors
                $this->getDb()->commit();
                $this->setId($id);
                return $this->toArray();
            } else {
                $this->getDb()->rollBack();
                $this->setResponse(400, "User could not be saved");
            }
        } catch (\Exception $e) {
            $this->getDb()->rollBack();
            $this->setResponse(500, "An error occurred: " . $e->getMessage());
        }
    }

    public function get()
    {
        if ($this->exists()) {
            return true;
        } else {
            $this->setResponse(404, "User not found");
        }
    }
    
    public function getFromOAuthId() {
        if ($this->getOAuthId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->join("users", "oauth_users.user_id = users.id")->where(["oauth_users.id = '" . $this->getOAuthId() . "'"])->execute();
            return $data;
        }
    }

    public function getOAuthId() {
        return $this->oAuthId;
    }

    public function setOAuthId($oAuthId) {
        $this->oAuthId = $oAuthId;
    }
}
