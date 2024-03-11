<?php

/**
 * class Email
 */
namespace App\Classes\UserSubSystem;

use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

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
        $mailersend = new MailerSend(['api_key' => $this->appConfigInstance->get('MAILERSEND_API_KEY')]);

        $recipients = [
            new Recipient($this->email, $this->name),
        ];

        $emailParams = (new EmailParams())
            ->setFrom($this->appConfigInstance->get('MAILERSEND_SENDER_EMAIL'))
            ->setFromName('NU Munchies')
            ->setRecipients($recipients)
            ->setSubject($this->subject)
            ->setHtml($this->content)
            ->setText($this->content);
        $mailersend->email->send($emailParams);
    }

}