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
            parent::_construct($db);
            $this->appConfigInstance = new \Appconfig();
        }
        public static function getInstance($db)
        {
            if(self::$instance ===null){
                self::$instance = new Category($db);
            }
            return self::$instance;
        }
        public function exist($request)
        {
            if($this>getId() != null){
                $data = $this->getDb()->createSelect()->cols("*")->from("categories")->where(["id = '" .$request->getAttribute('cat_id'). "'"])->execute();
                if(count($data) == 0){
                    return false;
                } else {
                    return true;
                }
            } elseif ($this->getCatName() != null) {
                $data = $this->getDb()->createSelect()->cols("*")->from("categories")->where(["name = '" . $request->getAttribute('cat_name'). "'"])->execute();
                if(count($data) == 0){
                    return false;
                } else {
                    return true;
                }
            }
        }
        public function save()
        {
            if($this->checkSavable())
            {
                $catData = [
                    'cat_name' => $this->getCatName(),
                    'cat_image' => $this->getCatImage()
                ];
                $insertQuery = $this->getDb()->createInsert()->into('categories')->cols($userData);
                $id = $insertQuery->execute();
                if($id != null)
                {
                    $this->setId($id);
                    return $this->toArray();
                }
            }
            $this->setResponse(400, "Category could not be saved");
        }
        private function checkSavable()
        {
            $errors = [];
            $checkFields = [
                'CatName' => ['value' => $this->getCatName(), 'min' => 3, 'max' => 30, 'message' => 'catname'],
                'CatImage' => ['value' => $this->getCatImage(), 'min' => 0, 'max' => 100, 'message' => 'catimage']
            ];

            foreach ($checkFields as $field => $data)
            {
                if(empty($data['value']))
                {
                    $errors[] = "Missing {$field}";
                } elseif ($field === 'CatName' && (strlen($data['value']) < $data['min'] || strlen($data['value']) > $data['max']))
                {
                    $errors[] = "{$data['message']} must be between {$data['min']} and {$data['max']} characters";
                } elseif ($field == 'CatImage' && !filter_var($data['value'], FILTER_VALIDATE_EMAIL))
                {
                    $errors[] = "Invalid {$data['message']}";
                } elseif (strlen($data['value']) > $data['max'])
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
            $selectQuery = $this->getDb()->createSelect()->cols(["cat_name", "cat_image"])->from("categories")->where(["cat_id" => $this->getCatId()]);
            $data = $selectQuery->execute();
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
                return;
            }
            $selectQuery = $this->getDb()->createSelect()->cols(["cat_name", "cat_image"])->from("categories")->where(["cat_id" => $this->getCatId()]);
            $data = $selectQuery->execute();
            if(empty($data))
            {
                $this->setResponse(400, "Category does not Exist");
                return;
            }
            $changed = array_filter([
                'cat_name' => $this->getCatName() !== $data[0]['cat_name'] ? $this->getCatName() : null,
                'cat_image' => $this->getCatImage() !== $data[0]['cat_image'] ? $this->getCatImage() : null
            ]);
            if(empty($changed))
            {
                return['message' => "No changes"];
            }
            $this->getDb()->createUpdate()->table('categories')->set($changed)->where(["cat_id" => $this->getCatId()]);
            return['message' => "Category Updated"];
        }
        public function delete()
        {
            if($this->exists())
            {
                $delectQuery = $this->getDb()->createDelete()->from('categories')->where(["cat_id" => $this->getCatId()]);
                $delectQuery->execute();
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
            $jwt = $this->generateJWT($this->getCatId());
            $cat['jwt'] = $jwt;
            return $cat;
        }
        private function generateJWT($id)
        {
            $secretKey = $this->appConfigInstance->get('JWT_SECRET');

            $iat = time();
            $exp = strtotime('+5 hour', $iat);
            $iss = $_SERVER['HTTP_HOST'];
            $payload = [
                'cat_id' => $id,
                'iat' => $iat,
                'exp' => $exp,
                'iss' => $iss
            ];
            $jwt = JWT::encode($payload, $secretKey, 'HS256');
            return $jwt;
        }
        
        public function getCatName()
        {
            return $this->catName;
        }
        public function setCatName()
        {
            $this->catName = $catName;
        }
        public function getCatImage()
        {
            return $this->catImage;
        }
        public function setCatImage()
        {
            $this->catImage = $catImage;
        }
    }
?>