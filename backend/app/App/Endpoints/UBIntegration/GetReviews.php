<?php

namespace App\Endpoints\UBIntegration;

/**
 * class GetReviews
 * @author Cameron Bramley w21020682
 * Fetches all of the reviews, taking business_id as a parameter. This returns all reviews associated with that business_id.
 */

use Core\Endpoint\Endpoint;

class GetReviews extends Endpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'getreviews');
        $this->getAttributes()->addRequiredInts(['business_id']);
    }

    public function process($request)
    {
        $business_id = $request->getAttributes()['business_id'];
        $id = $this->getDb()->createSelect()->from('reviews')->cols('title, rating, review_details, first_name, last_name')->join('users', 'users.id = reviews.user_id')->where(["reviews.business_id = " . $business_id]);
        if ($id->execute()) {
            $this->setResponse(200, 'Reviews Retrieved', ['id' => $id]);
        } else {
            $this->setResponse(404, 'Invalid business_id!', ['id' => $id]);
        }
    }
}
