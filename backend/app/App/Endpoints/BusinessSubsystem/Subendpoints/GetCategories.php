<?php

namespace App\Endpoints\BusinessSubsystem\Subendpoints;


use Core\Endpoint\SubEndpoint\SubEndpoint;

class GetCategories extends SubEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'categories');
    }

    public function process($request)
    {
        parent::process($request);

        $res = $this->getDb()->createSelect()->cols("*")->from("categories")->execute();

        $this->setResponse(200, $res);
    }
}
