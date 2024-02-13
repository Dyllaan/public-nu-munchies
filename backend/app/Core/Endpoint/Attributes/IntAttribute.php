<?php
/**
 * Attribute class, used to validate integers
 * @author Louis Figes
 * @generated Github Copilot was used in the creation of this code.
 */
namespace Core\Endpoint\Attributes;

use Core\Util\Validator;
use Core\Endpoint\Attributes\AttributeInterface;

class IntAttribute implements AttributeInterface
{

    public function isValid($name, $value) 
    {
        return Validator::validateInt($name, $value, 1);
    }
}