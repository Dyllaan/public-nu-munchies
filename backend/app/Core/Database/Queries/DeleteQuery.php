<?php
/**
 * DeleteQuery is used to build a delete query in an object oriented way
 * @author Louis Figes 
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Database\Queries;

class DeleteQuery extends \Core\Database\Query implements \Core\Database\QueryInterface
{
    private $where;

    public function from($table) 
    {
        $this->table = "DELETE FROM $table";
        return $this;
    }

    public function where($conditions) 
    {
        $this->where = $this->conditionFormatter($conditions);
        return $this;
    }

    public function execute() 
    {
        if(empty($this->table)) {
            throw new \Core\ClientErrorException(422, ["message"=>"Incomplete query"]);
        }
        $query = "$this->table $this->where";
        return $this->db->executeQuery($query);
    }
}