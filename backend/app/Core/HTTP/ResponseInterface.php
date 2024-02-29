<?php


namespace Core\HTTP;

interface ResponseInterface
{
    public function isSuccess();
    public function getData();
    public function getResponseCode();
    public function getMessage();
    public function respond();
}
