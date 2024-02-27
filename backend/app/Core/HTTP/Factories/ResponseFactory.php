<?php

namespace Core\HTTP\Factories;

use Core\HTTP\Classes\Response;

class ResponseFactory
{
    public static function createResponse($code, $type, $data = null)
    {
        return new Response($code, $type, $data);
    }
}
