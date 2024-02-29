<?php


namespace App\Classes;

use Core\Database\Entity;

class Business extends Entity
{
    protected $id, $name;

    protected function getEntityName(): string
    {
        return "business";
    }

    protected function getIdColumnName(): string
    {
        return "id";
    }

    protected function getTableName(): string
    {
        return "businesses";
    }

    protected function getPropertyMap(): array
    {
        return [
            "id" => "id",
            "name" => "business_name",
        ];
    }
}
