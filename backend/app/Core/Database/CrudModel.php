<?php
/**
 * Crud Model gives the common functions
 * @auther Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Database;

use Core\HTTP\Classes\GivesResponse;

class CrudModel extends GivesResponse {

    private $db;
    private $id;
    
    public function __construct($db) 
    {
        $this->db = $db;
    }

    public function getId() 
    {
        return $this->id;
    }

    public function setId($id) 
    {
        $this->id = $id;
    }

    protected function getDb() 
    {
        return $this->db;
    }

    private function setDb($db) 
    {
        $this->db = $db;
    }
}