<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem;

use App\Classes\UserSubSystem\OAuthUser;
use Core\Endpoint\Endpoint;
use \Google\Client as GoogleClient;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Is the callback endpoint for OAuth2.0 via Google.
 * This is manually specified on the Google Developers cloud console and as such modifying its URL will require a change there.
 * This endpoint is used to verify an OAuth google login and then log the user in to NU-MUNCHIES or register them if they do not exist.
 */
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
            $user = OAuthUser::getInstance($this->getDb());
            $user->setOAuthId($payload['sub']);
            $user->setFirstName($payload['given_name']);
            // Google allows users without last names
            if(isset($payload['family_name'])) {
                $user->setLastName($payload['family_name']);
            }
            $user->setEmail($payload['email']);
            if($user->exists()) {
                $user->login();
                $this->setResponse(200, 'Login Successful', $user->toArray());
            } else {
                $user->register();
                $this->setResponse(200, 'Registration Successful', $user->toArray());
            }
        } else {
            $this->setResponse(401, 'Invalid token');
        }
    }
}
