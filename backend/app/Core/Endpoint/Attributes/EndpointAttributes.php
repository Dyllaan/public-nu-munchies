<?php

/**
 * class EndpointAttributes
 * is used to store the attributes of an endpoint for each method,
 * designed so that each endpoint can have different attributes for each method.
 * @generated Github CoPilot was used during the creation of this code
 */

namespace Core\Endpoint\Attributes;

use Core\HTTP\Classes\GivesResponse;
use Core\Endpoint\Attributes\IntAttribute;
use Core\Endpoint\Attributes\StringAttribute;

class EndpointAttributes extends GivesResponse
{
    private $exclusiveAttributes = [];
    private $requiredAttributes = [];
    private $allowed = [];

    public function validate($requestAttributes)
    {
        $this->validateRequiredAttributes($requestAttributes);
        $this->validateExclusiveAttributes($requestAttributes);
        $this->validateAllowedAttributes($requestAttributes);
    }


    /**
     * determines if the request attributes match the required attributes
     */
    protected function validateRequiredAttributes($requestAttributes)
    {
        if ($this->getRequiredAttributes() == null) {
            return;
        }

        if (!is_array($requestAttributes)) {
            $this->setResponse(400, 'Invalid Request Attributes', ['expected' => array_keys($this->getRequiredAttributes())]);
        }

        $intersection = array_intersect_key($requestAttributes, array_flip(array_keys($this->getRequiredAttributes())));
        $missingAttributes = array_diff_key($this->getRequiredAttributes(), $intersection);

        if (count($missingAttributes) > 0) {
            $this->setResponse(400, 'Missing required attributes', ['missing' => array_keys($missingAttributes)]);
        }

        foreach ($intersection as $name => $value) {
            $attribute = $this->getAttributeByName($name);
            if (!$attribute->isValid($name, $value)) {
                $this->setResponse(400, 'Invalid attribute', ['invalid' => $name]);
            }
        }
    }


    /**
     * determines if the request attributes match the exclusive attributes
     */
    private function validateExclusiveAttributes($requestAttributes)
    {
        if ($this->getExclusiveAttributes() == null) {
            return;
        }
        if (!is_array($requestAttributes)) {
            $this->setResponse(400, 'Invalid Request Attributes', ['expected' => array_keys($this->getExclusiveAttributes())]);
        }

        $exclusiveNames = array_keys($this->getExclusiveAttributes());
        $intersection = array_intersect_key($requestAttributes, array_flip($exclusiveNames));

        if (count($intersection) > 1) {
            $this->setResponse(400, 'Exclusive attributes', ['exclusive' => array_keys($intersection)]);
        }

        foreach ($intersection as $name => $value) {
            $attribute = $this->getAttributeByName($name);
            if (!$attribute->isValid($name, $value)) {
                $this->setResponse(400, 'Invalid attribute', ['invalid' => $name]);
            }
        }
    }

    /**
     * determines if the request attributes are allowed
     */
    private function validateAllowedAttributes($requestAttributes)
    {
        $allowedAttributes = $this->getAll();
        
        if($allowedAttributes == null && $requestAttributes == null) {
            return;
        }
    
        if (empty($allowedAttributes) && !empty($requestAttributes)) {
            foreach ($requestAttributes as $name => $value) {
                $this->setResponse(400, 'Disallowed attribute', ['disallowed' => $name]);
                return;
            }
        }
    
        if (!is_array($requestAttributes)) {
            $this->setResponse(400, 'Request Must be an array', ['invalid' => $requestAttributes]);
            return;
        }
    
        foreach ($requestAttributes as $name => $value) {
            if (!isset($allowedAttributes[$name])) {
                $this->setResponse(400, 'Disallowed attribute', ['disallowed' => $name]);
                continue;
            }
    
            $attribute = $this->getAttributeByName($name);
            if (!$attribute->isValid($name, $value)) {
                $this->setResponse(400, 'Invalid attribute', ['invalid' => $name]);
            }
        }
    }
    

    public function getExclusiveAttributes()
    {
        return $this->exclusiveAttributes;
    }

    public function addRequiredInt($name)
    {
        $this->requiredAttributes[$name] = $this->createInt();
    }

    public function addRequiredInts($names)
    {
        foreach ($names as $name) {
            $this->requiredAttributes[$name] = $this->createInt();
        }
    }

    public function addRequiredString($name)
    {
        $this->requiredAttributes[$name] = $this->createString();
    }

    public function addRequiredStrings($names)
    {
        foreach ($names as $name) {
            $this->requiredAttributes[$name] = $this->createString();
        }
    }

    public function addAllowedInt($name)
    {
        $this->allowed[$name] = $this->createInt();
    }

    public function addAllowedInts($names)
    {
        foreach ($names as $name) {
            $this->allowed[$name] = $this->createInt();
        }
    }

    public function addAllowedString($name)
    {
        $this->allowed[$name] = $this->createString();
    }

    public function addAllowedStrings($names)
    {
        foreach ($names as $name) {
            $this->allowed[$name] = $this->createString();
        }
    }

    public function addExclusiveInt($name)
    {
        $this->exclusiveAttributes[$name] = $this->createInt();
    }

    public function addExclusiveInts($names)
    {
        foreach ($names as $name) {
            $this->exclusiveAttributes[$name] = $this->createInt();
        }
    }

    public function addExclusiveString($name)
    {
        $this->exclusiveAttributes[$name] = $this->createString();
    }

    public function addExclusiveStrings($names)
    {
        foreach ($names as $name) {
            $this->exclusiveAttributes[$name] = $this->createString();
        }
    }

    protected function createString()
    {
        return new StringAttribute();
    }

    protected function createInt()
    {
        return new IntAttribute();
    }

    protected function createInts($names)
    {
        $attributes = [];
        foreach ($names as $name) {
            $attributes[$name] = $this->createInt();
        }
        return $attributes;
    }

    protected function createStrings($names)
    {
        $attributes = [];
        foreach ($names as $name) {
            $attributes[$name] = $this->createString();
        }
        return $attributes;
    }

    public function getRequiredAttributes()
    {
        return $this->requiredAttributes;
    }

    public function getMethod()
    {
        // TODO: there is error $this->method is not defined, i dont know what to do with this
        return null;
        return $this->method;
    }

    public function getAllowedAttributes()
    {
        return $this->allowed;
    }

    public function isExclusiveAttribute($name)
    {
        return isset($this->exclusiveAttributes[$name]);
    }

    public function isRequiredAttribute($name)
    {
        return isset($this->requiredAttributes[$name]);
    }

    public function isAllowedAttribute($name)
    {
        return isset($this->getAll()[$name]);
    }

    private function getAll()
    {
        $merge = array_replace_recursive($this->exclusiveAttributes, $this->allowed);
        $merge = array_replace_recursive($merge, $this->requiredAttributes);
        return $merge;
    }

    private function getAttributeByName($name)
    {
        return $this->getAll()[$name];
    }
}
