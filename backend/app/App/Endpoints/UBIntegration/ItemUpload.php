<?php

/**
 * class TestEndpoint
 * Delete later...
 */

namespace App\Endpoints\UBIntegration;


use Core\Endpoint\Endpoint;
use Core\HTTP\Classes\Request;

class ItemUpload extends Endpoint
{

    public function __construct()
    {
        $business_id = isset($_GET["business-id"]) ? $_GET["business-id"] : null;
        $name = isset($_GET["name"]) ? $_GET["name"] : null;
        $price = isset($_GET["price"]) ? $_GET["price"] : null;
        $date = isset($_GET["date"]) ? $_GET["date"] : null;
        $time = isset($_GET["time"]) ? $_GET["time"] : null;
        $business_name = isset($_GET["business-name"]) ? $_GET["business-name"] : null;
        $status = isset($_GET["status"]) ? $_GET["status"] : null;
        $request = new Request("GET");
        $requestMethod = $request->getRequestMethod();

        switch($requestMethod){
            case 'GET':
                $sql = "INSERT INTO 
                items (business_id, name, price, date, time, business_name, status) 
                VALUES (:business_id, :name, :price, :date, :time, :business_name, :status)";
                $dbConn = new \Core\Database\Database('DB_URL');
                $data = $dbConn->executeQuery($sql, [":business_id" => $business_id, ":name" => $name, ":price" => $price, ":date" => $date, ":time" => $time, ":business_name" => $business_name, ":status" => $status]);
                parent::__construct($data);
                break;
        }
        
       

    }

    public function process($request)
    {
        $msg = 1;
        $this->setResponse(200, 'request received', $user);
    }
}