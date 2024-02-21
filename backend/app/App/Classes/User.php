<?php

/**
 * class User
 * User is used to handle user data, including login and registration
 * Implements the CrudInterface to allow for easy database interaction
 * @generated Github CoPilot was used during the creation of this code
 */

namespace App\Classes;

use Firebase\JWT\JWT;
use Core\Database\CrudModel;
use Core\Database\CrudInterface;
use \App\Classes\Token;

class User extends CrudModel implements CrudInterface
{
    private $name;
    private $email;
    private $password;
    private $token;
    private static $instance = null;

    private \AppConfig $appConfigInstance;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
    }

    public static function getInstance($db)
    {
        if (self::$instance === null) {
            self::$instance = new User($db);
        }
        return self::$instance;
    }

    public function exists()
    {
        if ($this->getId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();
            if (count($data) == 0) {
                return false;
            } else {
                return true;
            }
        } elseif ($this->getEmail() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["email = '" . $this->getEmail() . "'"])->execute();
            if (count($data) == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public function login()
    {
        $cons[] = "email = '$this->email'";
        $data = $this->getDb()->createSelect()->cols("*")->from("users")->where($cons)->execute();
        if (count($data) == 0) {
            $this->setResponse(401, "Invalid email");
        } else {
            if (!$this->checkPassword($this->password, $data[0]['password'])) {
                $this->setResponse(401, "Invalid password");
            } else {
                $this->setId($data[0]['id']);
                $this->setName($data[0]['name']);
            }
        }
    }

    public function register()
    {
        if ($this->exists()) {
            $this->setResponse(400, "User already exists");
        } else {
            $this->save();
        }
    }

    private function checkSavable()
    {
        $errors = [];

        // TODO: maybe lets predefine these messages in some other file as constants and then just reference to them ie. $errorMessages['missingName']

        if (empty($this->getName())) {
            $errors[] = "Missing name";
        }

        if (empty($this->getEmail())) {
            $errors[] = "Missing email";
        }

        if (empty($this->getPassword())) {
            $errors[] = "Missing password";
        } elseif (strlen($this->getPassword()) < 8) {
            $errors[] = "Password must be at least 8 characters";
        } elseif (strlen($this->getPassword()) > 100) {
            $errors[] = "Password must be less than 100 characters";
        }

        if (!filter_var($this->getEmail(), FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email";
        } elseif (strlen($this->getEmail()) > 60) {
            $errors[] = "Email must be less than 60 characters";
        }

        if (strlen($this->getName()) < 3) {
            $errors[] = "Name must be at least 3 characters";
        } elseif (strlen($this->getName()) > 30) {
            $errors[] = "Name must be less than 30 characters";
        }

        if (!empty($errors)) {
            $len = count($errors);
            $this->setResponse(400, `There are: $len`, $errors);
        }
        return true;
    }

    public function save()
    {
        if ($this->checkSavable()) {
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
            $id = $this->getDb()->createInsert()->into('users')->cols('name, email, password')->values([$this->getName(), $this->getEmail(), $this->getPassword()])->execute();
            if ($id != null) {
                $this->setId($id);
                return $this->toArray();
            }
        } else {
            $this->setResponse(400, "User could not be saved");
        }
    }

    public function get()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(400, "User does not exist");
        } else {
            $this->setName($data[0]['name']);
            $this->setEmail($data[0]['email']);
        }
    }

    public function update()
    {
        if (!$this->exists()) {
            $this->setResponse(400, "User does not exist");
        }
        // TODO: lets create constants of the table name and columns and then just reference them here so it is not hardcoded
        $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(400, "User does not exist");
        } else {
            $changed = [];
            // TODO: i am wondering if we can make this if statement bit more cleaner
            if ($this->getName() != $data[0]['name']) {
                $changed['name'] = $this->getName();
            }
            if ($this->getEmail() != $data[0]['email']) {
                $changed['email'] = $this->getEmail();
            }
            if ($this->getPassword() != null) {
                $changed['password'] = password_hash($this->getPassword(), PASSWORD_DEFAULT);
            }
            if ($changed != []) {
                $this->getDb()->createUpdate()->table('users')->set($changed)->where(["user_id = '" . $this->getId() . "'"])->execute();
                return ['message' => "User updated"];
            } else {
                return ['message' => "No changes"];
            }
        }
    }

    public function delete()
    {
        if ($this->exists()) {
            $this->getDb()->createDelete()->from('users')->where(["id = '" . $this->getId() . "'"])->execute();
            return ['message' => "User deleted"];
        } else {
            $this->setResponse(400, "User does not exist");
        }
    }

    public function toArray()
    {
        $user['user'] = [
            'name' => $this->name,
            'email' => $this->email,
        ];
        $jwt = $this->generateJWT($this->getId());
        $user['jwt'] = $jwt;
        return $user;
    }

    private function checkPassword($password, $hash)
    {
        if (password_verify($this->password, $hash)) {
            return true;
        } else {
            $this->setResponse(400, "Invalid password");
        }
    }

    public function verifyToken()
    {
        $token = new Token();
        if ($token->isValid()) {
            $this->setId($token->getUserId());
            $this->get();
            return true;
        } else {
            $this->setResponse(400, "Invalid token");
        }
    }

    private function generateJWT($id)
    {
        $secretKey = $this->appConfigInstance->get('JWT_SECRET');

        $iat = time();
        $exp = strtotime('+5 hour', $iat);
        $iss = $_SERVER['HTTP_HOST'];
        $payload = [
            'id' => $id,
            'iat' => $iat,
            'exp' => $exp,
            'iss' => $iss
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
    }

    public function getToken()
    {
        return $this->token;
    }

    public function setToken($jwt)
    {
        $this->token = $jwt;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }
}
