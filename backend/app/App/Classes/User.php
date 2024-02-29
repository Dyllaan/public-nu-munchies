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

class User extends CrudModel implements CrudInterface
{
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $token;
    protected static $instance = null;

    private \AppConfig $appConfigInstance;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->setTable("users");
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
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
            if (count($data) == 0) {
                return false;
            } else {
                return true;
            }
        } elseif ($this->getEmail() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $this->getEmail() . "'"])->execute();
            if (count($data) == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public function doesUserExistAtEmail($email)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $email . "'"])->execute();
        if (count($data) == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function login()
    {
        $cons[] = "email = '$this->email'";
        $data = $this->getDb()->createSelect()->cols("users.first_name, users.last_name, users.id, passwords.password")->from($this->getTable())->join("passwords", "users.id = passwords.user_id")->where($cons)->execute();
        if (count($data) == 0) {
            $this->setResponse(401, "Account not found!");
        } else {
            if (!$this->checkPassword($this->password, $data[0]['password'])) {
                $this->setResponse(401, "Invalid password");
            } else {
                $this->setId($data[0]['id']);
                $this->setFirstName($data[0]['first_name']);
                $this->setLastName($data[0]['last_name']);
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

        if (empty($this->getFirstName())) {
            $errors[] = "Missing first name";
        }

        if (empty($this->getLastName())) {
            $errors[] = "Missing last name";
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

        if (strlen($this->getFirstName()) < 3) {
            $errors[] = "First name must be at least 3 characters";
        } elseif (strlen($this->getFirstName()) > 30) {
            $errors[] = "First name must be less than 30 characters";
        }

        if (strlen($this->getLastName()) < 3) {
            $errors[] = "Last name must be at least 3 characters";
        } elseif (strlen($this->getLastName()) > 30) {
            $errors[] = "Last name must be less than 30 characters";
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
            $this->getDb()->beginTransaction();
            try {
                $this->password = password_hash($this->password, PASSWORD_BCRYPT);
                $id = $this->getDb()->createInsert()->into($this->getTable())->cols('first_name, last_name, email')->values([$this->getFirstName(), $this->getLastName(), $this->getEmail()])->execute();
                if ($id != null) {
                    $this->getDb()->createInsert()->into('passwords')->cols('user_id, password')->values([$id, $this->getPassword()])->execute();
                    $this->getDb()->commit();
                    $this->setId($id);
                    return $this->toArray();
                } else {
                    $this->getDb()->rollBack();
                    $this->setResponse(400, "User could not be saved");
                }
            } catch (\Exception $e) {
                $this->getDb()->rollBack();
                $this->setResponse(500, "An error occurred: " . $e->getMessage());
            }
        } else {
            $this->setResponse(400, "User could not be saved");
        }
    }

    public function get()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(400, "User does not exist1");
        } else {
            $this->setFirstName($data[0]['first_name']);
            $this->setLastName($data[0]['last_name']);
            $this->setEmail($data[0]['email']);
        }
    }
    
    public function update()
    {
        if (!$this->exists()) {
            $this->setResponse(400, "User does not exist");
        }
        // TODO: lets create constants of the table name and columns and then just reference them here so it is not hardcoded
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(400, "User does not exist");
        } else {
            $changed = [];
            // TODO: i am wondering if we can make this if statement bit more cleaner
            if ($this->getFirstName() != $data[0]['first_name']) {
                $changed['first_name'] = $this->getFirstName();
            }
            if ($this->getLastName() != $data[0]['last_name']) {
                $changed['last_name'] = $this->getLastName();
            }
            if ($this->getEmail() != $data[0]['email']) {
                $changed['email'] = $this->getEmail();
            }
            if ($this->getPassword() != null) {
                $changed['password'] = password_hash($this->getPassword(), PASSWORD_BCRYPT);
            }
            if ($changed != []) {
                $this->getDb()->beginTransaction();
                try {
                    $this->getDb()->createUpdate()->table($this->getTable())->set($changed)->where(["user_id = '" . $this->getId() . "'"])->execute();
                    $this->getDb()->commit();
                    return ['message' => "User updated"];
                } catch (\Exception $e) {
                    $this->getDb()->rollBack();
                    $this->setResponse(500, "An error occurred: " . $e->getMessage());
                }
            } else {
                return ['message' => "No changes"];
            }
        }
    }

    public function delete()
    {
        if ($this->exists()) {
            $this->getDb()->createDelete()->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
            return ['message' => "User deleted"];
        } else {
            $this->setResponse(400, "User does not exist");
        }
    }

    public function toArray()
    {
        $user['user'] = [
            'id' => $this->getId(),
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'email' => $this->getEmail(),
        ];
        //hardcoded provider id not good
        $jwt = $this->generateJWT($this->getId(), 1);
        $user['jwt'] = $jwt;
        return $user;
    }

    public function checkPassword($password, $hash)
    {
        if (password_verify($this->password, $hash)) {
            return true;
        } else {
            $this->setResponse(400, "Invalid password");
        }
    }

    public function generateJWT($id, $providerId)
    {
        $secretKey = $this->appConfigInstance->get('JWT_SECRET');

        $iat = time();
        $exp = strtotime('+5 hour', $iat);
        $iss = $_SERVER['HTTP_HOST'];
        $payload = [
            'id' => $id,
            'iat' => $iat,
            'exp' => $exp,
            'iss' => $iss,
            'provider_id' => $providerId
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        return $jwt;
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


    public function getToken()
    {
        return $this->token;
    }

    public function setToken($jwt)
    {
        $this->token = $jwt;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
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
