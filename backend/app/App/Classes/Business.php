<?php


namespace App\Classes;

use Core\Database\Entity;

class Business extends Entity
{
    protected $id, $name, $address_optional, $email_optional;

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
            "email_optional" => "business_email",
            "address_optional" => "business_address",
        ];
    }
}
