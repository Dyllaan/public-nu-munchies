<?php
/**
 * Specifies the required methods for a query
 * @author Louis Figes
 */

namespace Core\Database;

interface QueryInterface 
{
    public function execute();
}