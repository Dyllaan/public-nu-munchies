<?php
namespace Core\HTTP\Classes;

use Core\HTTP\Factories\ResponseFactory;

class GivesResponse
{
    protected function setResponse($responseCode, $message, $data = null) 
    {
        return ResponseFactory::createResponse($responseCode, $message, $data);
    }
}