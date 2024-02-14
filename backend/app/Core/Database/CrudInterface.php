<?php

/**
 * interface CrudInterface
 * Defines rules for each of the objects that the API uses, like Content
 */

namespace Core\Database;

interface CrudInterface
{
    public function get();
    public function save();
    public function update();
    public function delete();
    public function toArray();
    public function exists();
}
