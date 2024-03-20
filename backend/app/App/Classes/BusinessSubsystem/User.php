<?php

namespace App\Classes\BusinessSubsystem;

use Core\Database\Entity;

class User extends Entity
{
    public $id, $first_name, $last_name, $email;
    protected function getEntityName(): string
    {
        return "user";
    }

    protected function getIdColumnName(): string
    {
        return "id";
    }

    protected function getTableName(): string
    {
        return "users";
    }

    protected function getPropertyMap(): array
    {
        return [
            "id" => "id",
            "first_name" => "first_name",
            "last_name" => "last_name",
            "email" => "email",
        ];
    }
}
