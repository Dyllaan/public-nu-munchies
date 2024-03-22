<?php



namespace App\Classes\BusinessSubsystem;

use Core\Database\Entity;

class Order extends Entity
{
    public $id, $business_id, $user, $item, $status;

    protected function getEntityName(): string
    {
        return "order";
    }

    protected function getIdColumnName(): string
    {
        return "id";
    }

    protected function getTableName(): string
    {
        return "orders";
    }

    protected function getPropertyMap(): array
    {
        return [
            "id" => "id",
            "business_id" => "business_id",
            "user" => "user_id",
            "item" => "items_id",
            "status" => "status",
        ];
    }

    public function getOrdersByBusiness($businessId)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from("orders")->where([
            "business_id = $businessId",
        ])->execute();


        $formattedData = [];
        foreach ($data as $row) {
            $this->_setProperties($row);
            if ($this->user > 0) {
                $user = new User($this->getDb());
                $user->id = $this->user;
                $userData = $user->getById();
                unset($userData['id']);
                $this->user = $userData;
            }
            if ($this->item > 0) {
                $item = new Item($this->getDb());
                $item->id = $this->item;
                $itemData = $item->getById();
                unset($itemData['id']);
                $this->item = $itemData;
            }
            array_push($formattedData, $this->toArray());
        }
        return $formattedData;
    }

    public function acceptOrder()
    {
        $data = $this->getDb()->createUpdate()->table("orders")->set([
            "status" => "accepted"
        ])->where([
            "id = $this->id"
        ])->execute();
        return $data;
    }

    public function declineOrder()
    {
        $data = $this->getDb()->createUpdate()->table("orders")->set([
            "status" => "declined"
        ])->where([
            "id = $this->id"
        ])->execute();
        return $data;
    }
}
