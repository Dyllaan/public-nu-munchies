<?php
    /**
     * class Category
     * @author Nathan Nordstrom-Hearne w21025072
     * 
     * Category is used to store cat data such as adding and removing a category.
     */

    namespace App\Classes;

    use Firebase\JWT\JWT;
    use Core\Database\CrudModel;
    use Core\Database\CrudInterface;

    class Category extends CrudModel implements CrudInterface
    {
        private $catName;
        private $catImage;

        private static $instance = null;

        private \AppConfig $appConfigInstance;

        public function __construct($db)
        {
            parent::__construct($db);
            $this->appConfigInstance = new \Appconfig();
            $this->setTable("category");
        }
        public static function getInstance($db)
        {
            if(self::$instance ===null){
                self::$instance = new Category($db);
            }
            return self::$instance;
        }
        public function exists()
        {
            if ($this->getId() != null) {
                $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["cat_id = '" . $this->getId() . "'"])->execute();
                if (count($data) == 0) {
                    return false;
                } else {
                    return true;
                }
            } elseif ($this->getCatName() != null) {
                $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["cat_name = '" . $this->getCatName() . "'"])->execute();
                if (count($data) == 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        public function save()
        {
            $catData = [
                'cat_name' => $this->getCatName(),
                'cat_image' => $this->getCatImage()
            ];
            $id = $this->getDb()->createInsert()->into('categories')->cols('cat_name, cat_image')->values([$this->getCatName(), $this->getCatImage()])->execute();                
            
            if($id != null)
            {
                $this->setId($id);
                return $this->toArray();
            }
        
        $this->setResponse(400, "Category could not be saved");
        }
        private function checkSavable()
        {
            $errors = [];
            $checkFields = [
                'CatName' => ['value' => $this->getCatName(), 'min' => 3, 'max' => 30, 'message' => 'catname'],
                'CatImage' => ['value' => $this->getCatImage(), 'min' => 3, 'max' => 30, 'message' => 'catname']

            ];

            foreach ($checkFields as $field => $data)
            {
                if(empty($data['value']))
                {
                    $errors[] = "Missing {$field}";
                } elseif ($field === 'CatName' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "{$data['message']} must be between {$data['min']} and {$data['max']} characters";
                } elseif ($field === 'CatImage' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
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
            $data = $this->getDb()->createSelect()->into("category")->cols(["cat_name", "cat_image"])->where(["cat_id" => $this->getId()]);
            
            if(empty($data))
            {
                $this->setResponse(400, "Category does not Exist");
            } else 
            {
                $catData = $data[0];
                $this->setCatName($catData['cat_name']);
                $this->setCatImage($catData['cat_image']);
            }
        }
        public function update()
        {
            if(!$this->exists())
            {
                $this->setResponse(400, "Category does not Exists");
            }
            $data = $this->getDb()->createSelect()->cols(["cat_name"])->from($this->getTable())->where(["cat_id" => $this->getId()]);
            
            if(count($data) == 0)
            {
                $this->setResponse(400, "Category does not Exist");
            } 
            $changed = array_filter([
                'cat_name' => $this->getCatName() !== $data[0]['cat_name'] ? $this->getCatName() : null,
                'cat_image' => $this->getCatImage() !== $data[0]['cat_image'] ? $this->getCatImage() : null
            ]);
            if(empty($changed))
            {
                return['message' => "No changes"];
            }
            $this->getDb()->createUpdate()->table('categories')->set($changed)->where(["cat_id" => $this->getId()]);
            return['message' => "Category Updated"];
        }
        public function delete()
        {
            if($this->exists())
            {
                $this->getDb()->createDelete()->from($this->getTable())->where(["cat_id = '" . $this->getId() . "'"])->execute();
                return ['message' => "Category Deleted"];
            }
            $this->setResponse(400, "Category does not Exist");
        }
        public function toArray()
        {
            $cat['categories'] = [
                'cat_name' => $this->getCatName(),
                'cat_image' => $this->getCatImage()
            ];
            $jwt = $this->generateJWT($this->getId(), 1);
            $cat['jwt'] = $jwt;
            return $cat;
        }
        public function generateJWT($id, $providerId)
        {
            $secretKey = $this->appConfigInstance->get('JWT_SECRET');

                $iat = time();
                $exp = strtotime('+5 hour', $iat);
                $iss = $_SERVER['HTTP_HOST'];
                $payload = [
                    'cat_id' => $id,
                    'iat' => $iat,
                    'exp' => $exp,
                    'iss' => $iss,
                    'provider_id' => $providerId
                ];
                $jwt = JWT::encode($payload, $secretKey, 'HS256');
                return $jwt;
        }
        
        public function getCatName()
        {
            return $this->catName;
        }
        public function setCatName($catName)
        {
            $this->catName = $catName;
        }
        public function getCatImage()
        {
            return $this->catImage;
        }
        public function setCatImage($catImage)
        {
            $this->catImage = $catImage;
        }
    }
?>