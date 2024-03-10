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
            if ($this->address > 0) {
                $address = new Address($this->getDb());
                $address->id = $this->address;
                $addressData = $address->getById();
                unset($addressData['id']);
                $formattedData[0]['address'] = $addressData;
            }
        }
        return $formattedData;
    }

    public function getById()
    {
        $this->_checkForId();

        $data = $this->getDb()->createSelect()->cols("*")->from(static::getTableName())->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(404, "No " . static::getEntityName() . " found with ID " . $this->id);
            return null;
        } else {
            $this->_setProperties($data[0]);
            if ($this->address > 0) {
                $address = new Address($this->getDb());
                $address->id = $this->address;
                $addressData = $address->getById();
                unset($addressData['id']);
                $this->address = $addressData;
            }
            if ($this->verified_optional_hidden) {
                return $this->toArray();
            } else {
                $this->setResponse(404, "No " . static::getEntityName() . " found with ID " . $this->id . " or it is not verified");
            }
        }
    }
}
