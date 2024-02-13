<?php
namespace Core\Util;

class EndpointUtil {
    public static function parseRequestURI() {
        $url = $_SERVER["REQUEST_URI"];
        $url = parse_url($url, PHP_URL_PATH);
        $path = trim($url, '/');
        $path = preg_replace('#^api/#', '', $path);
        return explode('/', $path);
    }

    public static function getMainEndpointName() {
        $parts = EndpointUtil::parseRequestURI();
        return $parts[0] ?? null;
    }

    public static function getSubEndpointName() {
        $parts = EndpointUtil::parseRequestURI();
        return isset($parts[1]) ? implode('/', array_slice($parts, 1)) : null; 
    }

    public static function getRequestMethod() {
        return $_SERVER['REQUEST_METHOD'];
    }
}