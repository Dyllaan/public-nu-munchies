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
        }
        public static function getInstance($db)
        {
            if(self::$instance === null)
            {
                self::$instance = new Nutrition($db);
            }
        }
        public function exists()
        {
            if($this>getId() != null){
                $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["id = '" .$request->getAttribute('food_id'). "'"])->execute();
                if(count($data) == 0){
                    return false;
                } else {
                    return true;
                }
            } elseif ($this->getNutritionName() != null) {
                $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["name = '" . $request->getAttribute('food_name'). "'"])->execute();
                if(count($data) == 0){
                    return false;
                } else {
                    return true;
                }
            }
        }
        public function delete()
        {
            if($this->exists())
            {
                $delectQuery = $this->getDb()->createDelete()->from('nutrition_details')->where(["food_id" => $this->getId()]);
                $delectQuery->execute();
                return ['message' => "Nutrition Details Deleted"];
            }
            $this->setResponse(400, "Nutrition Details does not Exist");
        }
        public function get()
        {
            $selectQuery = $this->getDb()->createSelect()->cols(["*"])->from("nutrition_details")->where(["food_id" => $this->getId()]);
            $data = $selectQuery->execute();
            if(empty($data))
            {
                $this->setResponse(400, "Nutrition Detail does not Exist");
            } else 
            {
                $nutritionData = $data[0];
                $this->setFoodName($nutritionData['food_name']);
                $this->setWeight($nutritionData['weight']);
                $this->setCalories($nutritionData['calories']);
                $this->setProtein($nutritionData['protein']);
                $this->setCarbs($nutritionData['carbs']);
                $this->setFat($nutritionData['fat']);
                $this->setSalt($nutritionData['salt']);
                $this->setQuantity($nutritionData['quantity']);
            }
        }
        public function update()
        {
            if(!$this->exists())
            {
                $this->setResponse(400, "Nutrition Details does not Exists");
                return;
            }
            $selectQuery = $this->getDb()->createSelect()->cols(["*"])->from("nutrition_details")->where(["food_id" => $this->getId()]);
            $data = $selectQuery->execute();
            if(empty($data))
            {
                $this->setResponse(400, "Nutrition Details does not Exist");
                return;
            }
            $changed = array_filter([
                'food_name' => $this->getFoodName() !== $data[0]['food_name'] ? $this->getFoodName() : null,
                'weight' => $this->getWeight() !== $data[0]['weight'] ? $this->getWeight() : null,
                'calories' => $this->getCalories() !== $data[0]['calories'] ? $this->getCalories() : null,
                'protein' => $this->getProtein() !== $data[0]['protein'] ? $this->getProtein() : null,
                'carbs' => $this->getCarbs() !== $data[0]['carbs'] ? $this->getCarbs() : null,
                'fat' => $this->getFat() !== $data[0]['fat'] ? $this->getFat() : null,
                'salt' => $this->getSalt() !== $data[0]['salt'] ? $this->getSalt() : null,
                'quantity' => $this->getQuantity() !== $data[0]['quantity'] ? $this->getQuantity() : null,
            ]);
            if(empty($changed))
            {
                return['message' => "No changes"];
            }
            $this->getDb()->createUpdate()->table('nutrition_details')->set($changed)->where(["food_id" => $this->getId()]);
            return['message' => "Nutrition Details Updated"];
        }
        public function deleteNutrition()
        {
            if (!method_exists($this, 'delete')) {
                if($this->exists())
                {
                    $deleteQuery = $this->getDb()->createDelete()->from('nutrition_details')->where(["food_id" => $this->getId()]);
                    $deleteQuery->execute();
                    return ['message' => "Nutrition Deleted"];
                }
                $this->setResponse(400, "Nutrition Details does not Exist");
            } else {
                // Method already exists, handle accordingly
                // You can throw an exception, log an error, or simply return a message
                return ['message' => "Delete method already exists"];
            }
        }
        public function save()
        {
                $nutritionData = [
                    'food_name' => $this->getFoodName(),
                    'weight' => $this->getWeight(),
                    'calories' => $this->getCalories(),
                    'protein' => $this->getProtein(),
                    'carbs' => $this->getCarbs(),
                    'fat' => $this->getFat(),
                    'salt' => $this->getSalt(),
                    'quantity' => $this->getQuantity(),
                ];
                $id = $this->getDb()->createInsert()->into('nutrition_details')->cols('food_name', 'weight', 'calories', 'protein', 'carbs', 'fat', 'salt', 'quantity')->values([$this->getFoodName(), $this->getWeight(), $this->getCalories(), $this->getProtein(), $this->getCarbs(), $this->getFat(), $this->getSalt(), $this->getQuantity()])->execute();                
                
                if($id != null)
                {
                    $this->setId($id);
                    return $this->toArray();
                }
            
            $this->setResponse(400, "Nutrition Details could not be saved");
        }
        private function checkSavable()
        {
            $errors = [];
            $checkFields = [
                'food_name' => ['value' => $this->getFoodName(), 'min' => 3, 'max' => 30, 'message' => 'foodName'],
                'weight' => ['value' => $this->getWeight(), 'min' => 0, 'max' => 100, 'message' => 'weight'],
                'calories' => ['value' => $this->getCalories(), 'min' => 0, 'max' => 100, 'message' => 'calories'],
                'protein' => ['value' => $this->getProtein(), 'min' => 0, 'max' => 100, 'message' => 'protein'],
                'carbs' => ['value' => $this->getCarbs(), 'min' => 0, 'max' => 100, 'message' => 'carbs'],
                'fat' => ['value' => $this->getFat(), 'min' => 0, 'max' => 100, 'message' => 'fat'],
                'salt' => ['value' => $this->getSalt(), 'min' => 0, 'max' => 100, 'message' => 'Salt'],
                'quantity' => ['value' => $this->getQuantity(), 'min' => 0, 'max' => 100, 'message' => 'quantity']
            ];

            foreach ($checkFields as $field => $data)
            {
                if(empty($data['value']))
                {
                    $errors[] = "Missing {$field}";
                } elseif (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max'])
                {
                    $errors[] = "{$data['message']} must be between {$data['min']} and {$data['max']} characters";
                }
            }
            if(!empty($errors)){
                $len = count($errors);
                $this->setResponse(400, "There are: $len", $errors);
            }
            return true; //Return true if validation passes

            /**
             * if($this->checkSavable()) 
             * {
             *      Database query here
             *      $data = $this->getDb()->createSelect()->cols("*")->from("nutrition_details")->where(["id = '" . $this->getId() . "'"])->execute();

             * }
             */
        }
        public function toArray()
        {
            $nutritionDetails['nutrition_details'] = [
                'food_name' => $this->getFoodName(),
                'weight' => $this->getWeight(),
                'calories' => $this->getCalories(),
                'protein' => $this->getProtein(),
                'carbs' => $this->getCarbs(),
                'fat' => $this->getFat(),
                'salt' => $this->getSalt(),
                'quantity' => $this->getQuantity(),
            ];
            return $nutritionDetails;
        }
        public function getId()
        {
            return $this->food_id;
        }
        public function getFoodName()
        {
            return $this->food_name;
        }
        public function setFoodName($food_name)
        {
            $this->food_name = $food_name;
        }public function getWeight()
        {
            return $this->weight;
        }
        public function setWeight($weight)
        {
            $this->weight = $weight;
        }public function getCalories()
        {
            return $this->calories;
        }
        public function setCalories($calories)
        {
            $this->calories = $calories;
        }public function getProtein()
        {
            return $this->protein;
        }
        public function setProtein($protein)
        {
            $this->protein = $protein;
        }public function getCarbs()
        {
            return $this->carbs;
        }
        public function setCarbs($carbs)
        {
            $this->carbs = $carbs;
        }public function getFat()
        {
            return $this->fat;
        }
        public function setFat($fat)
        {
            $this->fat = $fat;
        }public function getSalt()
        {
            return $this->salt;
        }
        public function setSalt($salt)
        {
            $this->salt = $salt;
        }public function getQuantity()
        {
            return $this->quantity;
        }
        public function setQuantity($quantity)
        {
            $this->quantity = $quantity;
        }
    }
?>