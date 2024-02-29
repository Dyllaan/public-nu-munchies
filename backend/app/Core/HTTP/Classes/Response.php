<?php

namespace Core\HTTP\Classes;

class Response implements \Core\HTTP\ResponseInterface
{
    private $responseCode;
    private $message;
    private $data;

    public function __construct($responseCode, $message, $data)
    {
        $this->responseCode = $responseCode;
        $this->message = $message;
        $this->data = $data;
        $this->respond();
    }

    public function respond()
    {
        header('HTTP/1.1 ' . $this->getResponseCode());
        echo json_encode($this->buildResponse());
        exit;
    }

    private function buildResponse()
    {
        $r = [];
        if ($this->responseCode >= 400) {
            $r['status'] = "error";
        } else {
            $r['status'] = "success";
        }
        $r['message'] = $this->getMessage();
        if ($this->getData() !== null) {
            $r['data'] = $this->getData();
        }
        return $r;
    }

    public function isSuccess()
    {
        return $this->responseCode < 400;
    }

    public function getData()
    {
        return $this->data;
    }

    public function getResponseCode()
    {
        return $this->responseCode;
    }

    public function getMessage()
    {
        return $this->message;
    }
}
