<?php

/**
 * class UserEndpoint
 * Allows the current user to be retrieved, edited and deleted
 * @generated This class was created using Github Copilot
 */

namespace App\Endpoints\UserSubSystem\Mod;

use App\Classes\UserSubSystem\ModeratorEndpoint;

class SearchUsers extends ModeratorEndpoint
{

    public function __construct()
    {
        parent::__construct('GET', 'users');
        $this->setRequiresAuth(true);
        $this->getAttributes()->addAllowedInts(['page', 'verified']);
        $this->getAttributes()->addAllowedStrings(['search']);
    }

    private function handleSearch($request) 
    {
        if(!$request->hasAttribute('search')) {
            return null;
        }
        $search = $request->getAttribute('search');
        $search = strtolower($search);
        $newCondition = "(LOWER(users.first_name) LIKE '%". $search ."%'";
        $newCondition .= " OR LOWER(users.last_name) LIKE '%". $search ."%'";
        $newCondition .= " OR LOWER(users.email) LIKE '%". $search ."%')";
        return $newCondition;
    }

    private function handleVerified($request) 
    {
        $has = $request->hasAttribute('verified');
        if($has) {
            $attr = $request->getAttribute('verified');
            return "users.verified = ". $attr;

        }
        return null;
    }

    public function buildConditions($request) 
    {
        $conditions = [];
        $conditions[] = $this->handleSearch($request);
        $conditions[] = $this->handleVerified($request);
        $conditions = array_filter($conditions);
        return $conditions;
    }

    public function process($request)
    {
        parent::process($request);
        $page = 1;
        if($request->hasAttribute('page')) {
            $page = $request->getAttribute('page');
        }
        $usersData = $this->getModerator()->getAllUsers($page, $this->buildConditions($request));
        $this->setResponse(200, "Page ".$page." of users", ['users' => $usersData]);
    }
}
