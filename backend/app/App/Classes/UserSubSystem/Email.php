<?php

namespace App\Classes\UserSubSystem;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Email {

    private $email;
    private $name;
    private $subject;
    private $content;
    private \AppConfig $appConfigInstance;

    public function __construct($email, $name, $subject, $content)
    {
        $this->appConfigInstance = new \AppConfig();
        $this->email = $email;
        $this->name = $name;
        $this->subject = $subject;
        $this->content = $content;
    }

    public function sendEmail() {
        $mail = new PHPMailer(true); // Passing `true` enables exceptions

        try {
            $mail->isSMTP();
            $mail->Host = $this->appConfigInstance->get('MAIL_HOST');
            $mail->SMTPAuth = true;
            $mail->Username = $this->appConfigInstance->get('MAIL_USER');
            $mail->Password = $this->appConfigInstance->get('MAIL_PASS');
            $mail->SMTPSecure = 'ssl';
            $mail->Port = 465;

            $mail->setFrom('no-reply@numunchies.co.uk', 'NU Munchies');
            $mail->addAddress($this->email, $this->name);

            $mail->isHTML(true);
            $mail->Subject = $this->subject;
            $mail->Body    = $this->content;
            $mail->AltBody = strip_tags($this->content);

            $mail->send();
        } catch (Exception $e) {
            $this->setResponse(500, 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        }
    }

}
