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

    class Nutrition extends CrudModel  implements CrudInterface
    {
        //More to be added
        private $food_id;
        private $food_name;
        private $weight;
        private $calories;
        private $protein;
        private $carbs;
        private $fat;
        private $salt;
        private $quantity;

        private static $instance = null;

        private \AppConfig $appConfigInstance;
        
        public function __construct($db)
        {
            parent::__construct($db);
            $this->appConfigInstance = new \Appconfig();
            $this->setTable("nutrition_details");
        }
        public static function getInstance($db)
        {
            if(self::$instance === null)
            {
                self::$instance = new Nutrition($db);
            }
            return self::$instance;
        }
        public function exists()
        {
            if($this->getFoodId() !== null){
                $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["food_id = '" .$this->food_id . "'"])->execute();
                if(!empty($data)){
                    return true;
                }
            } elseif ($this->getFoodName() != null) {
                $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["name = '" . $this->food_id . "'"])->execute();
                if(count($data) == 0){
                    return true;
                }
            }
            return false;
        }
        public function save()
        {
            
                $foodData = [
                    'food_name' => $this->getFoodName(),
                    'weight' => $this->getWeight(),
                    'calories' => $this->getCalories(),
                    'protein' => $this->getProtein(),
                    'carbs' => $this->getCarbs(),
                    'fat' => $this->getFat(),
                    'salt' => $this->getSalt(),
                    'quantity' => $this->getQuantity(),
                ];
                $food_id = $this->getDb()->createInsert()->into('nutrition_details')->cols('food_name, weight, calories, protein, carbs, fat, salt, quantity')->values([$this->getFoodName(), $this->getWeight(), $this->getCalories(), $this->getProtein(), $this->getCarbs(), $this->getFat(), $this->getSalt(), $this->getQuantity()])->execute();                
                
                if($food_id != null)
                {
                    $this->setFoodId($food_id);
                    return $this->toArray();
                }
            
            $this->setResponse(400, "Nutrition could not be saved");
        }
        private function checkSavable()
        {
            $errors = [];
            $checkFields = [
                'FoodName' => ['value' => $this->getFoodName(), 'min' => 3, 'max' => 30, 'message' => 'food_name'],
                'Weight' => ['value' => $this->getWeight(), 'min' => 0, 'max' => 100, 'message' => 'weight'],
                'Calories' => ['value' => $this->getCalories(), 'min' => 0, 'max' => 100, 'message' => 'calories'],
                'Protein' => ['value' => $this->getProtein(), 'min' => 0, 'max' => 100, 'message' => 'protein'],
                'Carbs' => ['value' => $this->getCarbs(), 'min' => 0, 'max' => 100, 'message' => 'carbs'],
                'Fat' => ['value' => $this->getFat(), 'min' => 0, 'max' => 100, 'message' => 'fat'],
                'Salt' => ['value' => $this->getSalt(), 'min' => 0, 'max' => 100, 'message' => 'salt'],
                'Quantity' => ['value' => $this->getQuantity(), 'min' => 0, 'max' => 100, 'message' => 'quantity']

            ];

            foreach ($checkFields as $field => $data)
            {
                if(empty($data['value']))
                {
                    $errors[] = "Missing {$field}";
                } elseif ($field === 'FoodName' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "{$data['message']} must be between {$data['min']} and {$data['max']} characters";
                } elseif ($field === 'Weight' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Calories' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Protein' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Carbs' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Fat' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Salt' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }elseif ($field === 'Quantity' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "Invalid {$data['message']}";
                }
                 elseif (strlen($data['value']) > $data['max'])
                {
                    $errors[] = "{$data['message']} must be less than {$data['max']} characters";
                }
            }
            if(!empty($errors)){
                $len = count($errors);
                $this->setResponse(400, "There are: $len", $errors);
            }
            return true;
        }
        public function get()
        {
            $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["food_id = ".$this->food_id])->execute();
            var_dump($data); die();

            if(empty($data))
            {
                $this->setResponse(400, "Nutrition does not Exist");
            } else 
            {
                $foodData = $data[0];
                $this->setFoodName($foodData['food_name']);
                $this->setWeight($foodData['weight']);
                $this->setCalories($foodData['calories']);
                $this->setProtein($foodData['protein']);
                $this->setCarbs($foodData['carbs']);
                $this->setFat($foodData['fat']);
                $this->setSalt($foodData['salt']);
                $this->setQuantity($foodData['quantity']);
            }
        }
        public function update()
        {
            if(!$this->exists())
            {
                $this->setResponse(400, "Nutrition does not Exists");
            }
            $data = $this->getDb()->createSelect()->cols("food_name", "weight", "calories", "protein", "carbs", "fat", "salt", "quantity")->from($this->getTable())->where(["food_id = " .$this->food_id])->execute();
            
            if(count($data) == 0)
            {
                $this->setResponse(400, "Nutrition does not Exist");
            }
            $changed = array_filter([
                'food_name' => $this->getFoodName() !== $data[0]['food_name'] ? $this->getFoodName() : null,
                'weight' => $this->getWeight() !== $data[0]['weight'] ? $this->getWeight() : null,
                'calories' => $this->getCalories() !== $data[0]['calories'] ? $this->getCalories() : null,
                'protein' => $this->getProtein() !== $data[0]['protein'] ? $this->getProtein() : null,
                'carbs' => $this->getCarbs() !== $data[0]['carbs'] ? $this->getCarbs() : null,
                'fat' => $this->getFat() !== $data[0]['fat'] ? $this->getFat() : null,
                'salt' => $this->getSalt() !== $data[0]['salt'] ? $this->getSalt() : null,
                'quantity' => $this->getQuantity() !== $data[0]['quantity'] ? $this->getQuantity() : null
            ]);
            if(empty($changed))
            {
                return['message' => "No changes"];
            }
            $this->getDb()->createUpdate()->table('nutrition_details')->set($changed)->where(["food_id = " .$this->food_id])->execute();
            return['message' => "Nutrition Updated"];
        }
        public function delete()
        {
            if($this->exists())
            {
                $this->getDb()->createDelete()->from($this->getTable())->where(["food_id = '" . $this->food_id . "'"])->execute();
                
                return ['message' => "Nutrition Deleted"];
            }
            $this->setResponse(400, "Nutrition does not Exist");
        }
        public function toArray()
        {
            $nutrition['nutrition_details'] = [
                'item_' => $this->getFoodName(),
                'weight' => $this->getWeight(),
                'calories' => $this->getCalories(),
                'protein' => $this->getProtein(),
                'carbs' => $this->getCarbs(),
                'fat' => $this->getFat(),
                'salt' => $this->getSalt(),
                'quantity' => $this->getQuantity()
            ];

            return $nutrition;
        }
        public function generateJWT($id, $providerId)
        {
            $secretKey = $this->appConfigInstance->get('JWT_SECRET');

                $iat = time();
                $exp = strtotime('+5 hour', $iat);
                $iss = $_SERVER['HTTP_HOST'];
                $payload = [
                    'food_id' => $id,
                    'iat' => $iat,
                    'exp' => $exp,
                    'iss' => $iss,
                    'provider_id' => $providerId
                ];
                $jwt = JWT::encode($payload, $secretKey, 'HS256');
                return $jwt;
        }
        public function getFoodId()
        {
            return $this->food_id;
        }
        public function setFoodId($food_id)
        {
            $this->food_id =$food_id;
        }
        public function getFoodName()
        {
            return $this->food_name;
        }
        public function setFoodName($food_name)
        {
            $this->food_name = $food_name;
        }
        public function getWeight()
        {
            return $this->weight;
        }
        public function setWeight($weight)
        {
            $this->weight = $weight;
        }
        public function getCalories()
        {
            return $this->calories;
        }
        public function setCalories($calories)
        {
            $this->calories = $calories;
        }
        public function getProtein()
        {
            return $this->protein;
        }
        public function setProtein($protein)
        {
            $this->protein = $protein;
        }
        public function getCarbs()
        {
            return $this->carbs;
        }
        public function setCarbs($carbs)
        {
            $this->carbs = $carbs;
        }
        public function getFat()
        {
            return $this->fat;
        }
        public function setFat($fat)
        {
            $this->fat = $fat;
        }
        public function getSalt()
        {
            return $this->salt;
        }
        public function setSalt($salt)
        {
            $this->salt = $salt;
        }
        public function getQuantity()
        {
            return $this->quantity;
        }
        public function setQuantity($quantity)
        {
            $this->quantity = $quantity;
        }
    }
?>