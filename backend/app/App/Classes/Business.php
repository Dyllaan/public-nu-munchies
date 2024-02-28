<?php


namespace App\Classes;

use Firebase\JWT\JWT;
use Core\Database\CrudModel;
use Core\Database\CrudInterface;

class Business extends CrudModel implements CrudInterface
{
    private string $name;
    private string $email;
    private int $id;
    private string $address;
    private string $phone;
    private string $website;

    public function get()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from("business")->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(404, "Business not found");
        } else {
            $this->id = $data[0]['id'];
            $this->name = $data[0]['business_name'];
        }
        return $data;
    }

    public function update()
    {
        $this->getDb()->createUpdate()->table('business')->set(['name' => $this->name, 'email' => $this->email, 'address' => $this->address, 'phone' => $this->phone, 'website' => $this->website])->where(['id' => $this->getId()])->execute();
        return $this->toArray();
    }


    public function exists()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from("business")->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function delete()
    {
        $data = $this->getDb()->createDelete()->from('business')->where(['id' => $this->getId()])->execute();
        return $data;
    }

    public function save()
    {
        $newId = $this->getDb()->createInsert()->into('business')->cols("name,email,address,phone,website")->values([$this->name, $this->email, $this->address, $this->phone, $this->website])->execute();
        $this->id = $newId;
        return $this->toArray();
    }

    private function checkSavable()
    {
        if ($this->name == null || $this->email == null || $this->address == null || $this->phone == null || $this->website == null) {
            $this->setResponse(400, "Missing required fields");
        }
        return true;
    }
    // Auto generated Getters and Setters
    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __set($property, $value)
    {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
