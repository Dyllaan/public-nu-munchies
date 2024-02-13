<?php
/**
 * Query is the base class for all queries, just provides structure and some helper methods
 * @author Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Database;

class Query 
{
    protected $db;
    protected $table;

    public function __construct($db) 
    {
        $this->db = $db;
    }

    protected function conditionFormatter($conditions = []) 
    {
        if(!empty($conditions)) {
            $conditionString = "WHERE ";
            $conditionString .= implode(" AND ", $conditions);
            return $conditionString;
        } else {
            return "";
        }
    }
}