<?php
/**
 * class OrderItem
 * @author Cameron Bramley w21020682
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;
use Core\HTTP\Classes\Request;
use Core\Database\Queries;
use Core\Database;

class ApproveReview extends Endpoint
{

    public function __construct()
    {
        parent::__construct('PUT', 'approvereview');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['review_id']);
    }

    public function process($request)
    {
        $status = ['status' => 'approved'];
        $id = $this->getDb()->createUpdate()->table('reviews')->set($status)->where(["id = '" . $request->getAttribute('review_id'). "'"])->execute();
        
        $this->setResponse(200, 'Review Approved', ['id' => $id]);
    }
}  