<?php
/**
 * class Delete Review
 * @author Cameron Bramley w21020682
 * 
 * Deletes review if it does not get approved.
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;
use Core\HTTP\Classes\Request;
use Core\Database\Queries;
use Core\Database;

class DeleteReview extends Endpoint
{

    public function __construct()
    {
        parent::__construct('DELETE', 'deletereview');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredInts(['review_id']);
    }

    public function process($request)
    {
        $status = ['status' => 'approved'];
        $id = $this->getDb()->createDelete()->from('reviews')->where(["id = '" . $request->getAttribute('review_id') . "'"])->execute();
        
        $this->setResponse(200, 'Review Deleted', ['id' => $id]);
    }
}  