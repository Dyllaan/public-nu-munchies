<?php

/**
 * class EmailFactory
 * This class is responsible for creating an instance of the Email class
 */

namespace App\Factories;

use App\Classes\UserSubSystem\Email;
/**
 * @author Louis Figes W21017657
 * @generated GitHub Copilot was used during the creation of this code
 * Simple factory design pattern to create an email object
 */
class EmailFactory {

    public static function createEmail($email, $name, $subject, $content)
    {
        return new Email($email, $name, $subject, $content);
    }
    
}