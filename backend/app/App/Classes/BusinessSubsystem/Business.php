<?php

namespace App\Classes\BusinessSubsystem;

use App\Classes\BusinessSubsystem\Item;
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

    public function getById($verified = true)
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
                $this->address = $addressData;
            }
            if ($this->verified_optional_hidden || !$verified) {
                return $this->toArray();
            } else {
                $this->setResponse(404, "No " . static::getEntityName() . " found with ID " . $this->id . " or it is not verified");
            }
        }
    }

    public function updateVerification()
    {
        $this->_checkForId();
        $this->_checkIfIdExists();

        $this->getDb()->createUpdate()->table(static::getTableName())->set(
            [
                "business_verification" => $this->verified_optional_hidden,
            ]
        )->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        return $this->toArray();
    }

    public function getBusinessesByUser($user)
    {

        $userId = $user->getId();
        // join 
        $data = $this->getDb()->createSelect()->cols("b.*")->from("businesses b")->join("users_businesses ub", "b.id = ub.business_id")->where(["ub.user_id = $userId"])->execute();

        $formattedData = [];
        for ($i = 0; $i < count($data); $i++) {
            $this->_setProperties($data[$i]);

            if ($this->address > 0) {
                $address = new Address($this->getDb());
                $address->id = $this->address;
                $addressData = $address->getById();
                unset($addressData['id']);
                $formattedData[0]['address'] = $addressData;
            }

            array_push($formattedData, $this->toArray());
            $formattedData[$i]['verified'] = $this->verified_optional_hidden ? true : false;
        }

        return $formattedData;
    }

    public function getItems()
    {
        $item = new Item($this->getDb());
        $data = $item->getItemsByBusiness($this->id);
        return $data;
    }
}
