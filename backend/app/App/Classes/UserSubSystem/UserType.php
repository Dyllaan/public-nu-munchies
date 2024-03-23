<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;
use App\Classes\UserSubSystem\UserAddon;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Parent of Moderator and Councillor
 */
abstract class UserType extends UserAddon
{

    public function __construct($db, $table)
    {
        parent::__construct($db, $table);
    }

    public function is()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["user_id = '" . $this->getUser()->getId() . "'"])->execute();
        return count($data) > 0;
    }
}
