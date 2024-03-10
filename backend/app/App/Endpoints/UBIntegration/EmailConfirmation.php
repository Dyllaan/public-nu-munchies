<?php
/**
 * class EmailConfirmation
 * @author Cameron Bramley w21020682
 * 
 * Deletes review if it does not get approved.
 */

namespace App\Endpoints\UBIntegration;

use Core\Endpoint\Endpoint;
use Core\HTTP\Classes\Request;
use Core\Database\Queries;
use Core\Database;

class EmailConfirmation extends Endpoint
{

    public function __construct()
    {
        parent::__construct('DELETE', 'emailconfirmation');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addRequiredStrings(['email, item_name']);
        $this->getAttributes()->addRequiredInts(['price']);
    }

    public function process($request)
    {
        $title = $request->getAttribute('item_name') . ' Order Confirmation';
        $msg = "This is your order confirmation from NUMunchies!\n Item: " . $request->getAttribute('item_name') . '\n Price: ' . $request->getAttribute('price');
        mail($request->getAttribute('email'),$title , $msg);
        
        $this->setResponse(200, 'mail sent', ['id' => $id]);
    }
}  