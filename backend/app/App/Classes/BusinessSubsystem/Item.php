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
        ])->execute();

        $formattedData = [];
        foreach ($data as $row) {
            $this->_setProperties($row);
            if ($this->category_optional > 0) {
                $category = new Category($this->getDb());
                $category->id = $this->category_optional;
                $categoryData = $category->getById();
                $this->category_optional = $categoryData;
            }
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
