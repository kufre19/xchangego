<?php

namespace App\Notify;

use App\Notify\NotifyProcess;
use Mailjet\Client;
use Mailjet\Resources;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use SendGrid;
use SendGrid\Mail\Mail;

class Email extends NotifyProcess
{

    /**
     * Email of receiver
     *
     * @var string
     */
    public $email;

    /**
     * Assign value to properties
     *
     * @return void
     */
    public function __construct()
    {
        $this->statusField = 'email_status';
        $this->body = 'email_body';
        $this->globalTemplate = 'email_template';
        $this->notifyConfig = 'mail_config';
    }

    /**
     * Send notification
     *
     * @return void|bool
     */
    public function send()
    {
        //get message from parent
        $message = $this->getMessage();
        if ($message) {
            //Send mail
            $methodName = $this->setting->mail_config->name;
            $method = $this->mailMethods($methodName);
            $config = $this->setting->mail_config->{$methodName};
            try {
                $this->$method($config);
                $this->createLog('email');
            } catch (\Exception $e) {
                $this->createErrorLog($e->getMessage());
                session()->flash('mail_error', $e->getMessage());
            }
        }
    }

    /**
     * Get the method name
     *
     * @return string
     */
    protected function mailMethods($name)
    {
        $methods = [
            'php' => 'sendPhpMail',
            'smtp' => 'sendSmtpMail',
            'sendgrid' => 'sendSendGridMail',
            'mailjet' => 'sendMailjetMail',
        ];
        return $methods[$name];
    }

    protected function sendPhpMail()
    {
        $general = $this->setting;
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: $general->site_name <$general->email_from> \r\n";
        $headers .= "Reply-To: $general->site_name <$general->email_from> \r\n";
        $headers .= "Cc: <$general->email_from>" . "\r\n";

        @mail($this->email, $this->subject, $this->finalMessage, $headers);
    }

    protected function sendSmtpMail($config)
    {
        $mail = new PHPMailer(true);
        $general = $this->setting;
        //Server settings
        $mail->isSMTP();
        $mail->Host       = $config->host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $config->username;
        $mail->Password   = $config->password;
        if ($config->enc == 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
        $mail->Port       = $config->port;
        $mail->CharSet = 'UTF-8';
        //Recipients
        $mail->setFrom($general->email_from, $general->site_name);
        $mail->addAddress($this->email, $this->receiverName);
        $mail->addReplyTo($general->email_from, $general->site_name);
        // Content
        $mail->isHTML(true);
        $mail->Subject = $this->subject;
        $mail->Body    = $this->finalMessage;
        $mail->send();
    }

    protected function sendSendGridMail($config)
    {
        $general = $this->setting;
        $sendgridMail = new Mail();
        $sendgridMail->setFrom($general->email_from, $general->site_name);
        $sendgridMail->setSubject($this->subject);
        $sendgridMail->addTo($this->email, $this->receiverName);
        $sendgridMail->addContent("text/html", $this->finalMessage);
        $sendgrid = new SendGrid($config->appkey);
        $response = $sendgrid->send($sendgridMail);
        if ($response->statusCode() != 202) {
            throw new Exception(json_decode($response->body())->errors[0]->message);
        }
    }

    protected function sendMailjetMail($config)
    {
        $general = $this->setting;
        $mj = new Client($config->public_key, $config->secret_key, true, ['version' => 'v3.1']);
        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => $general->email_from,
                        'Name' => $general->site_name,
                    ],
                    'To' => [
                        [
                            'Email' => $this->email,
                            'Name' => $this->receiverName,
                        ]
                    ],
                    'Subject' => $this->subject,
                    'TextPart' => "",
                    'HTMLPart' => $this->finalMessage,
                ]
            ]
        ];
        $response = $mj->post(Resources::$Email, ['body' => $body]);
        if (!$response->success()) {
            throw new Exception($response->getData()['Messages'][0]['Errors'][0]['ErrorMessage']);
        }
    }

    /**
     * Configure some properties
     *
     * @return void
     */
    protected function prevConfiguration()
    {
        if ($this->user) {
            $this->email = $this->user->email;
            $this->receiverName = $this->user->fullname;
        }
        $this->toAddress = $this->email;
    }
}
