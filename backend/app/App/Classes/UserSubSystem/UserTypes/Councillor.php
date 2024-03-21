<?php

namespace App\Classes\UserSubSystem\UserTypes;

use App\Classes\UserSubSystem\UserType;

/**
 * @author Louis Figes W21017657
 * @description This class is an implementation of the UserType class which allows for the creation of a Councillor object which works on top of the user.
 * This approach was chosen over say further extensions of the user class as it is unnecessary to have a councillor object loaded for every endpoint
 * when very few actually require it.
 */

class Councillor extends UserType
{
    public function __construct($db)
    {
        parent::__construct($db, 'councillor');
    }
}
