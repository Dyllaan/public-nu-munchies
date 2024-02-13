<?php

/**
 * @author Louis Figes
 */

namespace Core\HTTP\Factories;

use Core\HTTP\Classes\Response;

class ResponseFactory
{
    public static function createResponse($code, $type, $data)
    {
        return new Response($code, $type, $data);
    }
}