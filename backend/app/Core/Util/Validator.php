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
        if (!filter_var($value, FILTER_VALIDATE_INT)) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' must be an integer']);
        } elseif ($min && (int)$value < $min) {
            throw new \Core\ClientErrorException(400, ['message' => $name . ' minimum value is ' . $min]);
        } elseif ($max && (int)$value > $max) {
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
}