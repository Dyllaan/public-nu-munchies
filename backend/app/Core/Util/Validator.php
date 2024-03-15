<?php

/**
 * Validator class, will make sure a variable is a selected type
 * @generated Github Copilot was used in the creation of this code.
 */

namespace Core\Util;

class Validator
{

    public static function validateInt($name, $value, $min = null, $max = null)
    {
        if (!is_numeric($value) || intval($value) != $value) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' must be an integer']);
        }
    
        $intValue = intval($value);
    
        if ($min !== null && $intValue < $min) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' minimum value is ' . $min]);
        } elseif ($max !== null && $intValue > $max) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' maximum value is ' . $max]);
        }
        return true;
    }
    
    public static function validateString($name, $value)
    {
        if (!is_string($value) || is_numeric($value)) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' must be a string']);
        }
        return true;
    }

    public static function validateBool($name, $value)
    {
        $value = boolval($value);
        if (!is_bool($value)) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' must be a boolean']);
        }
        return true;
    }
}
