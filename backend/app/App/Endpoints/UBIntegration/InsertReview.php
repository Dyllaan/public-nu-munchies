<?php

/**
 * class InsertReview
 * @author Cameron Bramley w21020682
 * 
 * Used to create a review in the reviews table.
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;

class InsertReview extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'insertreview');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['title', 'review_details']);
        $this->getAttributes()->addRequiredInts(['user_id', 'business_id', 'rating']);
    }

    public function process($request)
    {
        
        $id = $this->getDb()->createInsert()->into('reviews')->cols('user_id, business_id, title, rating, review_details')->values([$request->getAttribute('user_id'), $request->getAttribute('business_id'), $request->getAttribute('title'), $request->getAttribute('rating'), $request->getAttribute('review_details')])->execute();
        
        $this->setResponse(200, 'Review inserted', ['id' => $id]);
    }
}