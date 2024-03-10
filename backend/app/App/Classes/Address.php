<?php


namespace App\Classes;

use Core\Database\Entity;

class Address extends Entity
{
    public $id, $address, $city, $postcode, $country;

    protected function getEntityName(): string
    {
        return "address";
    }

    protected function getIdColumnName(): string
    {
        return "id";
    }

    protected function getTableName(): string
    {
        return "addresses";
    }

    protected function getPropertyMap(): array
    {
        return [
            "id" => "id",
            "address" => "address_line1",
            "city" => "address_city",
            "postcode" => "address_postcode",
            "country" => "address_country",
        ];
    }
}
