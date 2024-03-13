<?php

/**
 * class EmailFactory
 * This class is responsible for creating an instance of the Email class
 */

namespace App\Factories;

use App\Classes\UserSubSystem\Email;

class EmailFactory {

    public static function createEmail($email, $name, $subject, $content)
    {
        return new Email($email, $name, $subject, $content);
    }
    
}