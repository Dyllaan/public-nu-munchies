<?php

/**
 * Abstract parent class for the middleare, endpoint manager classes
 * @author Louis Figes W21017657
 */

namespace Core;

use Core\HTTP\Classes\GivesResponse;

abstract class Manager extends GivesResponse
{

    private $items;

    public function __construct() 
    {
        $this->add();
    }

    protected abstract function add();

    public function getItems()
    {
        return $this->items;
    }

    protected function addItemWithKey($endpointName, $item)
    {
        $this->items[$endpointName] = $item;
    }

    protected function addItem($item)
    {
        $this->items[] = $item;
    }

    public function hasItem($item) {
        return in_array($item, $this->items);
    }

    public function hasKey($key) {
        return array_key_exists($key, $this->items);
    }

    public function getItem($key) {
        return $this->items[$key];
    }
}