<?php

/**
 * Database class, makes connection to the database and handles queries
 * @author Louis Figes
 * @generated This class was created using Github Copilot
 */

namespace Core\Database;

use Core\Database\Queries\SelectQuery;
use Core\Database\Queries\InsertQuery;
use Core\Database\Queries\UpdateQuery;
use Core\Database\Queries\DeleteQuery;
use Core\ClientErrorException;

require_once __DIR__ . "/../Config/AppConfig.php";

class Database
{
    private $dbConnection;
    private static $instance = null;
    private $appConfigInstance;

    public function __construct()
    {
        $this->appConfigInstance = new \AppConfig();

        $this->setDbConnection();
    }

    /**
     * Performance enhancement: store the instance in a static variable.
     */
    public function __clone()
    {
        throw new ClientErrorException(500, "Cloning the database instance is not allowed", 500);
    }

    // Prevent unserialization of the instance.
    public function __wakeup()
    {
        throw new ClientErrorException(500, "Unserialising the db instance is not allowed", 500);
    }

    // Method to get the single instance of the class.
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function setDbConnection()
    {
        try {
            $dbUrl = $this->appConfigInstance->get('DB_URL');
            $this->dbConnection = new \PDO($dbUrl);
            $this->dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            $error['message'] = "Database Connection Error";
            $error['details'] = $e->getMessage();
            echo json_encode($error);
            exit();
        }
    }

    public function beginTransaction()
    {
        $this->dbConnection->beginTransaction();
    }

    public function commit()
    {
        $this->dbConnection->commit();
    }
    
    public function rollBack()
    {
        $this->dbConnection->rollBack();
    }

    public function createSelect()
    {
        return new SelectQuery($this);
    }

    public function createInsert()
    {
        return new InsertQuery($this);
    }

    public function createUpdate()
    {
        return new UpdateQuery($this);
    }

    public function createDelete()
    {
        return new DeleteQuery($this);
    }

    public function executeQuery($sql, $params = [])
    {
        echo $sql;
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function executeInsert($sql, $params = [])
    {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);
        return $this->dbConnection->lastInsertId();
    }
}
