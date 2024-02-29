<?php

namespace Core\Database;

use Core\Database\CrudModel;
use Core\Database\CrudInterface;

abstract class Entity extends CrudModel implements CrudInterface
{
    protected $db;

    protected $propertyColumnMap;

    protected $idColumnName;

    public function __construct($db)
    {
        $this->db = $db;
        $this->propertyColumnMap = $this->getPropertyMap();
        $this->idColumnName = static::getIdColumnName();
    }

    protected function getDb()
    {
        return $this->db;
    }

    public function get()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from(static::getTableName())->execute();
        if (count($data) == 0) {
            $this->setResponse(404, "There is no " . static::getEntityName() . " in the database");
        } else {
            $formattedData = [];
            foreach ($data as $row) {
                $this->_setProperties($row);
                array_push($formattedData, $this->toArray());
            }
        }
        return $formattedData;
    }
    public function getById()
    {
        $this->_checkForId();

        $data = $this->getDb()->createSelect()->cols("*")->from(static::getTableName())->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        if (count($data) == 0) {
            $this->setResponse(404, "No " . static::getEntityName() . " found with ID " . $this->id);
            return null;
        } else {
            $this->_setProperties($data[0]);
            return $this->toArray();
        }
    }

    public function update()
    {
        $this->_checkForId();
        $this->_checkIfIdExists();

        $this->getDb()->createUpdate()->table(static::getTableName())->set($this->_getPropertyMap())->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        return $this->toArray();
    }

    public function save()
    {
        if (!$this->_checkSavable()) {
            return;
        }
        // Convert the property map to two arrays: one for columns and one for values
        $columns = array_keys($this->_getPropertyMap());
        $values = array_values($this->_getPropertyMap());

        // skip id both in values and columns
        $idIndex = array_search(static::getIdColumnName(), $columns);
        if ($idIndex !== false) {
            unset($columns[$idIndex]);
            unset($values[$idIndex]);
        }


        $columnsString = implode(", ", $columns);


        $newId = $this->getDb()->createInsert()->into(static::getTableName())->cols($columnsString)->values($values)->execute();
        $this->id = $newId;
        return $this->toArray();
    }

    public function exists()
    {
        $data = $this->getDb()->createSelect()->cols("*")->from(static::getTableName())->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        if (count($data) == 0) {
            return false;
        } else {
            return true;
        }
    }

    public function delete()
    {
        $this->_checkForId();
        $this->_checkIfIdExists();

        $data = $this->getDb()->createDelete()->from(static::getTableName())->where([static::getIdColumnName() . " = '" . $this->id . "'"])->execute();
        return $data;
    }


    private function _checkSavable()
    {
        $reflection = new \ReflectionClass($this);
        foreach ($reflection->getProperties(\ReflectionProperty::IS_PUBLIC) as $property) {
            $propertyName = $property->getName();
            if (strpos($propertyName, '_optional') !== false) {
                continue;
            }
            if (empty($this->{$propertyName})) {
                $this->setResponse(400, $propertyName . " is required");
                return false;
            }
        }
        return true;
    }

    protected function _setProperties(array $data)
    {
        foreach ($this->propertyColumnMap as $property => $column) {
            if (property_exists($this, $property)) {
                if (!array_key_exists($column, $data)) {
                    $this->setResponse(400, "Column " . $column . " does not exist in " . static::getEntityName() . " column map");
                }
                $this->{$property} = $data[$column];
            } else {
                $this->setResponse(400, "Property " . $property . " does not exist in " . static::getEntityName());
            }
        }
    }

    private function _getPropertyMap(): array
    {
        $mappedProperties = [];
        foreach ($this->propertyColumnMap as $property => $column) {
            if (property_exists($this, $property)) {
                $mappedProperties[$column] = $this->{$property};
            } else {
                $this->setResponse(400, "Property " . $property . " does not exist in " . static::getEntityName());
            }
        }
        return $mappedProperties;
    }

    public function toArray(): array
    {
        $properties = [];
        foreach ($this->propertyColumnMap as $property => $column) {
            $properties[$property] = $this->{$property};
        }
        return $properties;
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __set($property, $value)
    {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
    }

    private function _checkForId()
    {
        if (!$this->id) {
            $this->setResponse(400, "ID is required, define it in the object");
        }
    }


    private function _checkIfIdExists()
    {
        if (!$this->exists()) {
            $this->setResponse(404, "No " . static::getEntityName() . " found with ID " . $this->id);
        }
    }

    abstract protected function getTableName(): string;
    abstract protected function getIdColumnName(): string;
    abstract protected function getEntityName(): string;
    abstract protected function getPropertyMap(): array;
}
