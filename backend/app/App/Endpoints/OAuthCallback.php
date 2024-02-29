<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints;

use App\Classes\User;
use Core\Endpoint\Endpoint;
use \Google\Client as GoogleClient;

class OAuthCallback extends Endpoint
{

    public function __construct()
    {
        parent::__construct('POST', 'oauthcallback');
        $this->getAttributes()->addRequiredStrings(['credential']);
    }

    public function process($request)
    {
        parent::process($request);

        $CLIENT_ID = '1063028006737-bf6rpohsbau9qaqijibvmg8p6sfhn9ch.apps.googleusercontent.com';

        $id_token = $request->getAttribute('credential');

        $client = new GoogleClient(['client_id' => $CLIENT_ID]);
        $payload = $client->verifyIdToken($id_token);
        if ($payload) {
            $userid = $payload['sub'];
            $this->setResponse(200, 'User retrieved', ['user' => $userid]);
        } else {
            $this->setResponse(401, 'Invalid token');
        }
    }
}
