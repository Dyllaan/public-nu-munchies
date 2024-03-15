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
use App\Classes\UserSubSystem\EmailToken;
use App\Classes\UserSubSystem\PasswordResetJWT;

class User extends CrudModel implements CrudInterface
{
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $token;
    private $verified;
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

    public function getBusinesses()
    {
        if(!$this->exists()) {
            return;
        }
        $data = $this->getDb()->createSelect()->cols("*")->from('businesses')->where(["user_id = '" . $this->getId() . "'"])->execute();
        return $data;
    }

    public function sendVerificationEmail()
    {
        $emailOTP = new EmailToken($this->getDb(), 'email_verification');
        $emailOTP->setUser($this);
        try {
            $emailOTP->sendEmail();
            return true;
        } catch (\Exception $e) {
            $this->setResponse(400, 'Error sending email', ['error' => $e->getMessage()]);
        }
    }

    public function sendPasswordResetEmail()
    {
        if(!$this->exists()) {
           return;
        }
        
        $emailOTP = new PasswordResetJWT($this->getDb());
        $emailOTP->setUser($this);
        try {
            $emailOTP->sendEmail();
            return true;
        } catch (\Exception $e) {
            $this->setResponse(400, 'Error sending email', ['error' => $e->getMessage()]);
        }
    }

    public function sendNewEmailOTP() {
        $this->get();
        if($this->isVerified()) {
            $this->setResponse(400, 'User is already verified');
            return;
        }
        $emailOTP = new PasswordResetJWT($this->getDb());
        $emailOTP->setUser($this);
        try {
            $emailOTP->sendEmail();
        } catch (\Exception $e) {
            $this->setResponse(400, 'Error sending email', ['error' => $e->getMessage()]);
        }
        $this->setResponse(200, 'New OTP sent');
    }
    
    public function verifyEmailOTP($otp, $type) {
        $emailOTP = new EmailToken($this->getDb());
        $emailOTP->setUser($this);
        $emailOTP->setType($type);
        if($emailOTP->validate($otp)) { 
            $this->verifyUser();
            $this->setResponse(200, 'Email token verified', $this->toArray());
            return;
        } else {
            $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
            return;
        }
    }

    public function verifyPasswordResetOTP($otp, $type) {
        $emailOTP = new PasswordResetJWT($this->getDb());
        $emailOTP->setUser($this);
        $emailOTP->setType($type);
        if($emailOTP->validate($otp)) {
            $this->setId($emailOTP->getUserId());
            return true;
            return;
        } else {
            $this->setResponse(400, 'Your OTP is either invalid or expired. Please request a new one.');
            return false;
        }
    }

    public function changePassword($newPassword, $jwt) {
        //validate email token
        if($this->verifyPasswordResetOTP($jwt, "password_reset")) {
            //hash password
            $password = password_hash($newPassword, PASSWORD_BCRYPT);
            try {
                $this->getDb()->createUpdate()->table('passwords')
                ->set(['password' => $password])->where(["user_id = '" . $this->getId() . "'"])->execute();
                $this->setResponse(200, 'Password changed successfully');
            } catch (\Exception $e) {
                $this->setResponse(500, "An error occurred: " . $e->getMessage());
            }
        }
        $this->setResponse(400, "Password reset failed");
    }

    public function isVerified()
    {
        return $this->verified;
    }

    public function exists()
    {
        if ($this->getId() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
            return count($data) > 0;
        } elseif ($this->getEmail() != null) {
            $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $this->getEmail() . "'"])->execute();
            return count($data) > 0;
        } else {
            return false;
        }
    }

    public function doesUserExistAtEmail($email)
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $email . "'"])->execute();
        return count($data) > 0;
    }

    public function login()
    {
        $cons[] = "email = '$this->email'";
        $data = $this->getDb()->createSelect()->cols("users.first_name, users.last_name, users.id, passwords.password, users.verified")->from($this->getTable())->join("passwords", "users.id = passwords.user_id")->where($cons)->execute();
        if (count($data) == 0) {
            $this->setResponse(401, "Account not found!");
        } else {
            if (!$this->checkPassword($this->password, $data[0]['password'])) {
                $this->setResponse(401, "Invalid password");
            } else {
                $this->setUserFields($data[0]);
                if ($data[0]['verified'] == 0) {
                    $this->sendVerificationEmail();
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
                    $this->setId($id);
                    return $this->sendVerificationEmail();
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
        if ($this->getId() != null) {
            $this->getFromId();
        } elseif ($this->getEmail() != null) {
            $this->getFromEmail();
        } else {
            $this->setResponse(500, "User object improperly initialised");
        }
    }

    private function getFromId()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["id = '" . $this->getId() . "'"])->execute();
        if (count($data) == 0) {
            return null;
        } else {
            $this->setUserFields($data[0]);
        }
    }

    private function getFromEmail() {
        $data = $this->getDb()->createSelect()->cols("*")->from($this->getTable())->where(["email = '" . $this->getEmail() . "'"])->execute();
        if (count($data) == 0) {
            return null;
        } else {
            $this->setUserFields($data[0]);
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
            $this->setVerified($data['verified']);
        }
    }
    
    public function verifyUser() {
        if(!$this->exists()) {
            $this->setResponse(400, "User does not exist");
        }
        if($this->isVerified()) {
            $this->setResponse(400, "User is already verified");
        }
        $this->get();
        $this->getDb()->createUpdate()->table($this->getTable())->set(['verified' => 1])->where(["id = '" . $this->getId() . "'"])->execute();
        $this->setVerified(1);
        $this->setResponse(200, "Verified User", $this->toArray());
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
        $user['user'] = [
            'id' => $this->getId(),
            'first_name' => $this->getFirstName(),
            'last_name' => $this->getLastName(),
            'email' => $this->getEmail(),
            'verified' => $this->isVerified()
        ];
        //hardcoded provider id not good
        if($useJwt) {
            $jwt = $this->generateJWT($this->getId(), 1);
            $user['jwt'] = $jwt;
        }
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

    public function setVerified($verified)
    {
        $this->verified = $verified;
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
}
