<?php

/**
 * class UpdateQuery
 * UpdateQuery is used to build an update query in an object oriented way
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Database\Queries;

class UpdateQuery extends \Core\Database\Query implements \Core\Database\QueryInterface
{
    private $set;
    private $where;

    public function table($table)
    {
        $this->table = "UPDATE $table";
        return $this;
    }

    public function set($set)
    {
        if (is_array($set)) {
            $setString = "SET ";
            foreach ($set as $key => $value) {
                $setString .= "$key = '$value', ";
            }
            $setString = rtrim($setString, ", ");
            $this->set = $setString;
        } else {
            throw new \Core\ClientErrorException(422, ["message" => "Invalid set data"]);
        }
        return $this;
    }


    public function where($conditions)
    {
        $this->where = $this->conditionFormatter($conditions);
        return $this;
    }

    public function execute()
    {
        if (empty($this->table) || empty($this->set)) {
            throw new \Core\ClientErrorException(422, ["message" => "Incomplete query"]);
        }
        $query = "$this->table $this->set $this->where";
        return $this->db->executeQuery($query);
    }
}
