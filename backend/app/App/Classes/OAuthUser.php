<?php

namespace App\Classes;

use App\Classes\User;

class OAuthUser extends User
{

    private \AppConfig $appConfigInstance;
    private $userId;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable('oauth_users');
    }

    public static function getInstance($db)
    {
        if (self::$instance === null) {
            self::$instance = new OAuthUser($db);
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
            if ($this->exists()) {
                $this->setResponse(200, 'Login Successful', $this->get());
            } else {
                $this->setResponse(404, "User not found");
            }
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
        if ($this->getEmail() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["email = '" . $this->getEmail() . "'"])->execute();
            if (count($data) > 0) {
                return true;
            }
        } elseif ($this->getId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
            if (count($data) > 0) {
                return true;
            }
        
        } else if ($this->getUserId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["user_id = '" . $this->getUserId() . "'"])->execute();
            if (count($data) > 0) {
                return true;
            }
        }
        return false;
    }

    public function save()
    {
        $this->getDb()->beginTransaction();
        try {
            $id = $this->getDb()->createInsert()->into('users')->cols('first_name, last_name, email')->values([$this->getFirstName(), $this->getLastName(), $this->getEmail()])->execute();
            if ($id != null) {
                $this->getDb()->createInsert()->into('oauth_users')->cols('id, user_id, provider_id')->values([$this->getId(), $id, 2])->execute();
                // commit the changes as there were no errors
                $this->getDb()->commit();
                $this->setUserId($id);
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
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) > 0) {
            $this->setUserId($data[0]['user_id']);
            $user = $this->getDb()->createSelect()->cols("*")->from('users')->where(["id = '" . $this->getUserId() . "'"])->execute();
            if (count($user) > 0) {
                $this->setFirstName($user[0]['first_name']);
                $this->setLastName($user[0]['last_name']);
                $this->setEmail($user[0]['email']);
                return $this->toArray();
            }
        }
        $this->setResponse(404, "User not found");
    }

    public function toArray()
    {
        $user['user'] = [
            'id' => $this->getId(),
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'email' => $this->getEmail(),
            'user_id' => $this->getUserId()
        ];
        $jwt = $this->generateJWT($this->getId(), 2);
        $user['jwt'] = $jwt;
        return $user;
    }

    public function getUserId() {
        return $this->userId;
    }

    public function setUserId($userId)
    {
        $this->userId = $userId;
    }
}
