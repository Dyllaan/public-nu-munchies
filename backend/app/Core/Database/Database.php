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

require_once __DIR__ . "/../Config/AppConfig.php";

class Database
{
    private $dbConnection;


    private $appConfigInstance;

    public function __construct($dbName)
    {
        $this->appConfigInstance = new \AppConfig();

        $this->setDbConnection();
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
