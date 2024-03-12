<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;

class Moderator extends CrudModel
{
    private \AppConfig $appConfigInstance;
    private $user;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable('moderator_users');
    }

    public function isModerator()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where("user_id = '" . $this->getId() . "'")->execute();
        return count($data) > 0;
    }


}
