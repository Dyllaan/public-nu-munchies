<?php

namespace Core\Endpoint\Attributes;

use Core\Util\Validator;
use Core\Endpoint\Attributes\AttributeInterface;

class BoolAttribute implements AttributeInterface
{

    public function isValid($name, $value)
    {
        return Validator::validateBool($name, $value, 1);
    }
}
