<?php

/**
 * InsertQuery is used to build an insert query in an object oriented way
 * @author Louis Figes
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Database\Queries;

class InsertQuery extends \Core\Database\Query implements \Core\Database\QueryInterface
{
    private $cols;
    private $values = [];
    private $parameters = [];

    public function into($table) 
    {
        $this->table = "INSERT INTO $table";
        return $this;
    }

    public function cols($cols) 
    {
        $this->cols = $cols;
        return $this;
    }

    public function values($values) 
    {
        foreach ($values as $key => $value) {
            $placeholder = ":value" . count($this->parameters);
            $this->parameters[$placeholder] = $value;
            $this->values[] = $placeholder;
        }
        return $this;
    }

    public function execute() 
    {
        if (empty($this->table) || empty($this->cols) || empty($this->values)) {
            throw new \Core\ClientErrorException(422, ["message"=>"Incomplete query"]);
        }

        $valuesPart = implode(", ", $this->values);
        $query = "$this->table ($this->cols) VALUES ($valuesPart)";

        return $this->db->executeInsert($query, $this->parameters);
    }
}