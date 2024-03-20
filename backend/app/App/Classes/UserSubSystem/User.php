<?php

/**
 * class User
 * User is used to handle user data, including login and registration
 * Implements the CrudInterface to allow for easy database interaction
 * @generated Github CoPilot was used during the creation of this code
 */

namespace App\Classes\UserSubSystem;

use Firebase\JWT\JWT;
use Core\Database\CrudModel;
use Core\Database\CrudInterface;
use App\Classes\UserSubSystem\UserHandlers\EmailHandler;
use App\Classes\UserSubSystem\UserHandlers\VerifiedHandler;
use App\Classes\UserSubSystem\UserHandlers\IPHandler;
use App\Classes\UserSubSystem\UserHandlers\BannedHandler;
use App\Classes\UserSubSystem\UserTypes\Moderator;
use App\Classes\UserSubSystem\UserTypes\Councillor;

class User extends CrudModel implements CrudInterface
{
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $token;
    private $exists;
    private $createdAt;

    private $emailHandler;
    private $verifiedHandler;
    private $ipHandler;
    private $bannedHandler;

    protected static $instance = null;

    private \AppConfig $appConfigInstance;

    public function __construct($db)
    {
        parent::__construct($db);
        $this->appConfigInstance = new \AppConfig();
        $this->emailHandler = new EmailHandler($this->getDb(), $this);
        $this->verifiedHandler = new VerifiedHandler($this->getDb(), $this);
        $this->ipHandler = new IPHandler($this->getDb(), $this);
        $this->bannedHandler = new BannedHandler($this->getDb(), $this);
        $this->setTable("users");
    }

    /**
     * Short term MFA solution
     * user is prompted to enter a token sent to their email
     * when their token expires
     */
    public function tokenExpired() {
        $this->verifyUser(0);
    }

    public static function getInstance($db)
    {
        if (self::$instance === null) {
            self::$instance = new User($db);
        }
        return self::$instance;
    }

    public function searchBusinesses($offset, $conditions = [], $limit = 10) {
            $data = $this->getDb()->createSelect()->cols("*")
        ->from("businesses")
        ->where($conditions)->limit($limit)->
        offset($offset)->execute();
        return $data;
    }

    public function searchItems($offset, $conditions = [], $limit = 10, $catId = null) {
        if($catId != null) {
            $conditions[] = "cat_id = '" . $catId . "'";
            $data = $this->getDb()->createSelect()->cols("*")
            ->from("items")->join("categories", "items.item_category = cat_id")
            ->where($conditions)->limit($limit)->
            offset($offset)->execute();
        return $data;
        } else {
            $data = $this->getDb()->createSelect()->cols("*")
            ->from("items")->where($conditions)->limit($limit)->
            offset($offset)->execute();
        return $data;
        }
    }

    public function getBusinesses()
    {
        if(!$this->exists()) {
            return;
        }
        $data = $this->getDb()->createSelect()->cols("*")->from('businesses')->where(["user_id = '" . $this->getId() . "'"])->execute();
        return $data;
    }

    public function changePassword($newPassword, $jwt) {
        //validate email token
        if($this->getEmailHandler()->verifyEmailToken($jwt, 'password_reset')){
            //hash password
            $password = password_hash($newPassword, PASSWORD_BCRYPT);
            try {
                $this->getDb()->createUpdate()->table('passwords')
                ->set(['password' => $password])->where(["user_id = '" . $this->getId() . "'"])->execute();
                $this->get();
                $this->setResponse(200, 'Password changed successfully', $this->toArray());
            } catch (\Exception $e) {
                $this->setResponse(500, "An error occurred: " . $e->getMessage());
            }
        }
        $this->setResponse(400, "Password reset failed");
    }

    public function exists()
    {
        if($this->exists) {
            return $this->exists;
        }
        if ($this->getEmail() != null) {
            if($this->doesUserExistAtEmail($this->getEmail())) {
                return true;
            }
        } elseif ($this->getId() != null) {
            if($this->doesUserExistAtId($this->getId())) {
                return true;
            }
        }
        return false;
    }

    public function get()
    {
        if ($this->getId() != null) {
            $this->getFromId();
        } elseif ($this->getEmail() != null) {
            $this->getFromEmail();
        } else {
            $this->setResponse(500, "User object improperly initialised");
        }
    }

    public function doesUserExistAtEmail($email)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $email . "'"])->execute();
        return count($data) > 0;
    }

    public function doesUserExistAtId($id)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $id . "'"])->execute();
        return count($data) > 0;
    }

    public function login()
    {
        $cons[] = "email = '$this->email'";
        $data = $this->getDb()->createSelect()->cols("users.first_name, users.last_name, users.id, passwords.password, users.verified, users.created_at, banned")->from($this->getTable())->join("passwords", "users.id = passwords.user_id")
        ->where($cons)->execute();
        if (count($data) == 0) {
            $this->setResponse(401, "Account not found!");
        } else {
            if (!$this->checkPassword($this->password, $data[0]['password'])) {
                $this->setResponse(401, "Invalid password");
            } else {
                $this->setUserFields($data[0]);
                if(!$this->getIPHandler()->isIPAllowed()) {
                    $this->getEmailHandler()->sendEmailToken('ip_verification');
                }
                if ($data[0]['verified'] == 0) {
                    $this->getEmailHandler()->sendEmailToken('email_verification');
                    return $this->toArray();
                } else {
                    return $this->toArray();
                }
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
                    $id = intval($id);
                    $this->setId($id);
                    $this->getIPHandler()->addIP($_SERVER['REMOTE_ADDR']);

                    return $this->getEmailHandler()->sendEmailToken('email_verification');
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

    protected function getFromId()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            return null;
        } else {
            $this->setUserFields($data[0]);
            return $data;
        }
    }

    protected function getFromEmail() {
        $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["email = '" . $this->getEmail() . "'"])->execute();
        if (count($data) == 0) {
            return null;
        } else {
            $this->setUserFields($data[0]);
            return $data;
        }
    }

    public function setUserFields($data) {
        if(isset($data['id'])) {
            $this->setId($data['id']);
        }
        if(isset($data['first_name'])) {
            $this->setFirstName($data['first_name']);
        }
        if(isset($data['last_name'])) {
            $this->setLastName($data['last_name']);
        }
        if(isset($data['email'])) {
            $this->setEmail($data['email']);
        }
        if(isset($data['verified'])) {
            $this->getVerifiedHandler()->setVerified($data['verified']);
        }
        if(isset($data['created_at'])) {
            $this->setCreatedAt($data['created_at']);
        }
        if(isset($data['banned'])) {
            $this->getBannedHandler()->setBanned($data['banned']);
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
                $this->setResponse(400, "Password cannot be updated by this method");
            }
            if($this->getBannedHandler()->isBanned() != $data[0]['banned']) {
                $changed['banned'] = $this->getBannedHandler()->isBanned();
            }

            if ($changed != []) {
                $this->getDb()->beginTransaction();
                try {
                    $this->getDb()->createUpdate()->table($this->getTable())->set($changed)->where(["
                    id = '" . $this->getId() . "'"])->execute();
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

    public function getFromUserId() {
        if ($this->getId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from("users")->where(["id = '" . $this->getId() . "'"])->execute();
            return $data;
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

    public function toArray($useJwt = true)
    {
        //is allowed
        if(!$this->getIPHandler()->isIPAllowed()) {
            $user['user'] = [
                'email' => $this->getEmail(),
                'allowed' => false,
                'ip' => $_SERVER['REMOTE_ADDR'],
                'banned' => boolval($this->getBannedHandler()->isBanned())
            ];
            $user['types'] = $this->getUserTypes();
        } else {
            $user['user'] = [
                'id' => $this->getId(),
                'first_name' => $this->getFirstName(),
                'last_name' => $this->getLastName(),
                'email' => $this->getEmail(),
                'verified' => $this->getVerifiedHandler()->isVerified(),
                'created_at' => $this->getCreatedAt(),
                'allowed' => true,
                'ip' => $_SERVER['REMOTE_ADDR'],
                'banned' => boolval($this->getBannedHandler()->isBanned())
            ];
            $user['types'] = $this->getUserTypes();
        }
        //hardcoded provider id not good
        if($useJwt) {
            $jwt = $this->generateJWT($this->getId(), 1);
            $user['jwt'] = $jwt;
        }
        return $user;
    }

    public function getUserTypes() {
        $isModerator = false;
        $mod = new Moderator($this->getDb(), 'moderator');
        $mod->setUser($this);
        if ($mod->is()) {
            $isModerator = true;
        }
    
        $isCouncillor = false;
        $councillor = new Councillor($this->getDb(), 'councillor');
        $councillor->setUser($this);
        if ($councillor->is()) {
            $isCouncillor = true;
        }

        return ['moderator' => $isModerator, 'councillor' => $isCouncillor];
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

    function getBannedHandler() {
        return $this->bannedHandler;
    }

    function setBannedHandler($bannedHandler) {
        $this->bannedHandler = $bannedHandler;
    }

    public function getEmailHandler()
    {
        return $this->emailHandler;
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

    public function getName() {
        return $this->getFirstName() . " " . $this->getLastName();
    }

    public function doesExist() {
        return $this->exists;
    }

    public function setExists($exists) {
        $this->exists = $exists;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
    }

    public function getVerifiedHandler() {
        return $this->verifiedHandler;
    }

    public function getIPHandler() {
        return $this->ipHandler;
    }
}