<?php

namespace App\Classes\UserSubSystem\UserTypes;

use App\Classes\UserSubSystem\User;
use App\Classes\UserSubSystem\UserAddon;
use App\Classes\Business;

class Moderator extends UserAddon
{
    private \AppConfig $appConfigInstance;

    public function __construct($db)
    {
        parent::__construct($db, 'moderator_users', 'moderator');
    }

    public function searchUsers($offset, $conditions = [], $limit = 10) {
        $data = $this->getDb()->createSelect()->cols("*")
        ->from($this->getUser()->getTable())
        ->where($conditions)->limit($limit)->
        offset($offset)->execute();
        return $data;
    }

    public function banUser($userId, $banned) {
        $user = new User($this->getDb());
        $user->setId($userId);
        if($user->exists()) {
            $user->get();
            $user->getBannedHandler()->setBanned($banned);
            $user->update();
        } else {
            $this->setResponse(400, "User does not exist");
        }
    }

    public function removeBusiness($businessId) {
        $data = $this->getDb()->createSelect()->cols("*")->from('businesses')->where(['id = ' . $businessId])->execute();
        if(count($data) == 0) {
            $this->setResponse(400, "Business does not exist");
            return;
        }
        $this->getDb()->createDelete()->from('businesses')->where(['id = ' . $businessId])->execute();
    }
}
