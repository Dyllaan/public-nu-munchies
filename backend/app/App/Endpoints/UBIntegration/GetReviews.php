<?php
namespace App\Endpoints\UBIntegration;

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
        $id = $this->getDb()->createSelect()->from('reviews')->cols('title, rating, review_details, first_name, last_name')->join('users', 'users.id = reviews.user_id')->where(["reviews.business_id = " . $business_id])->execute();
        $this->setResponse(200, 'Reviews Retrieved', ['id' => $id]);
    }
}