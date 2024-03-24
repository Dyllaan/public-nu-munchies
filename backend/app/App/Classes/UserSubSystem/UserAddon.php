<?php

namespace App\Classes\UserSubSystem;

use App\Classes\UserSubSystem\User;
use Core\Database\CrudModel;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Used by the Moderator and Councillor UserTypes and Password Change, i chose this approach rather than extending the class for ease of integration with OAuth as it allows
 * classes using this abstract class to only be able to be used on specific endpoints.
 * 
 * It also further seperates concerns
 */
abstract class UserAddon extends CrudModel
{
    private \AppConfig $appConfigInstance;
    private $user;

    public function __construct($db, $table)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable($table);
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
