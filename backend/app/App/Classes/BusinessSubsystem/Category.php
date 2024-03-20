<?php



namespace App\Classes\BusinessSubsystem;

use Core\Database\Entity;

class Category extends Entity
{
    public $id, $name;

    protected function getEntityName(): string
    {
        return "category";
    }

    protected function getIdColumnName(): string
    {
        return "cat_id";
    }

    protected function getTableName(): string
    {
        return "categories";
    }


    protected function getPropertyMap(): array
    {
        return [
            "id" => "cat_id",
            "name" => "cat_name"
        ];
    }
}
