<?php

namespace App\Endpoints\UserSubSystem\UserSubEndpoints;

use Core\Endpoint\SubEndpoint\SubEndpoint;
use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

class EmailToken extends SubEndpoint
{
    private $apiClient;

    public function __construct()
    {
        parent::__construct('POST', 'email');
        $this->setRequiresAuth(true);
    }

    public function process($request)
    {
        parent::process($request);

        $mailersend = new MailerSend(['api_key' => getenv('MAILERSEND_API_KEY')]);

        $recipients = [
            new Recipient('lonecodeyt@gmail.com', 'Lone Code'),
        ];

        $emailParams = (new EmailParams())
            ->setFrom(getenv('MAILERSEND_SENDER_EMAIL'))
            ->setFromName('NU Munchies Team')
            ->setRecipients($recipients)
            ->setSubject('Your NU Munchies Token')
            ->setHtml('This is the HTML content')
            ->setText('This is the text content');
        if($mailersend->email->send($emailParams)) {
            $this->setResponse(200, 'Email sent');
        } else {
            $this->setResponse(500, 'Email not sent');
        }
    }
}
