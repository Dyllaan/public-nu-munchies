<?php
    /**
     * class Nutrition
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Nutrition is used for implementing a nutrition/food consuming tracking. 
     */
    namespace App\Classes;

    use Firebase\JWT\JWT;
    use Core\Database\CrudModel;
    use Core\Database\CrudInterface;
    use App\Classes\User;

    class Nutrition extends CrudModel  implements CrudInterface
    {
        //More to be added

        private \AppConfig $appConfigInstance;
        
        public function __construct($db)
        {
            parent::_construct($db);
            $this->appConfigInstance = new \Appconfig();
        }
        
        public function logFood($food_id, $food_name, $weight, $calories, $protein, $carbs, $fat, $salt, $quantity)
        {
            //Sanitize inputs
            $food_id = intval($food_id);
            $food_name = htmlspecialchars($food_name);
            $weight = intval($weight);
            $calories = intval($calories);
            $protein = intval($protein);
            $carbs = intval($carbs);
            $fat = intval($fat);
            $salt = intval($salt);
            $quantity = intval($quantity);

            // Insert food entry into the database
            $sql = "INSERT INTO nutrition_details(food_id, food_name, weight, calories, protein, carbs, fat, salt, quantity) VALUES (:food_id, :food_name, :weight, :calories, :protein, :carbs, :fat, :salt, :quantity)";
            $params = array(
                ':food_id' => $food_id,
                ':food_name' => $food_name,
                ':weight' => $weight,
                ':calories' => $calories,
                ':protein' => $protein,
                ':carbs' => $carbs,
                ':fat' => $fat,
                ':salt' => $salt,
                ':quantity' => $quantity
            );

            try{
                $this->db->query($sql, $params);
                return true; //Successfully logged food entry
            } catch (Exception $e) {
                return false; //Failed to log food entry
            }

        }
    }
?>