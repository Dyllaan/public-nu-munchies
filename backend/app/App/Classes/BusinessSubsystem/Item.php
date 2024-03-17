<?php



namespace App\Classes\BusinessSubsystem;

use Core\Database\Entity;

class Item extends Entity
{
    public $id, $name, $price, $expiry_optional, $status_optional, $nutrition_optional, $collection, $category_optional, $business_id;

    protected function getEntityName(): string
    {
        return "item";
    }

    protected function getIdColumnName(): string
    {
        return "id";
    }

    protected function getTableName(): string
    {
        return "items";
    }


    public function getItemsByBusiness($businessId)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from("items")->where([
            "business_id = $businessId",
            "item_status = 'open'",
            "collect_time >= NOW()",
        ])->execute();

        $formattedData = [];
        foreach ($data as $row) {
            $this->_setProperties($row);
            array_push($formattedData, $this->toArray());
        }
        return $formattedData;
    }

    protected function getPropertyMap(): array
    {
        return [
            "id" => "id",
            "name" => "item_name",
            "price" => "item_price",
            "expiry_optional" => "item_expiry",
            "status_optional" => "item_status",
            "collection" => "collect_time",
            "category_optional" => "item_category",
            "business_id" => "business_id",
        ];
    }
}
