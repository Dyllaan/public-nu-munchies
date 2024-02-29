<?php

/**
 * interface AttributeInterface
 * All attributes must have a validation function, this allows for other attributes to be created
 * @generated Github Copilot was used in the creation of this code.
 */

namespace Core\Endpoint\Attributes;

interface AttributeInterface
{
    public function isValid($name, $value);
}
