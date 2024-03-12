<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;

class Moderator extends User
{
    private \AppConfig $appConfigInstance;
    private $userId;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable('moderator_users');
    }


}
