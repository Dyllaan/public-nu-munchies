<?php


namespace App\Classes;

use Core\Database\Entity;

class Business extends Entity
{
    public $id, $name, $description, $address, $email_optional, $phone_optional, $verified_optional_hidden;

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
            "description" => "business_description",
            "email_optional" => "business_email",
            "address" => "business_address",
            "phone_optional" => "business_phone",
            "verified_optional_hidden" => "business_verification",
        ];
    }

    public function get()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from(static::getTableName())->execute();
        if (count($data) == 0) {
            $this->setResponse(404, "There is no business in the database");
        } else {
            $formattedData = [];
            foreach ($data as $row) {
                $this->_setProperties($row);
                if ($this->verified_optional_hidden) {
                    array_push($formattedData, $this->toArray());
                }
            }
        }
        return $formattedData;
    }
}
