<?php
$recipient = "simonsays3000@protonmail.com"; // Replace with the recipient's email address
$subject = "Test Email from Localhost";
$message = "This is a test email sent from localhost.";

$from = "support@xchangego.com"; // Replace with your email address
$fromName = "Your Name"; // Replace with your name

$smtpHost = "smtp.titan.email";
// $smtpHostConnect = "xchangego.com";
$smtpPort = 465;
$smtpUsername = "support@xchangego.com";
$smtpPassword = "wEZbP986qP34saN2dW";

$headers = "From: " . $fromName . " <" . $from . ">\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Creating socket connection
$socket = fsockopen($smtpHostConnect, $smtpPort, $errno, $errstr, 15);
if (!$socket) {
    die("Unable to connect to SMTP server: $errstr ($errno)");
}

fgets($socket);
fputs($socket, "HELO localhost\r\n");
fgets($socket);

// Start SMTP authentication
fputs($socket, "AUTH LOGIN\r\n");
fgets($socket);
fputs($socket, base64_encode($smtpUsername) . "\r\n");
fgets($socket);
fputs($socket, base64_encode($smtpPassword) . "\r\n");
$response = fgets($socket);

if (!str_starts_with($response, "235")) {
    die("SMTP authentication failed: $response");
}

// Send email headers
fputs($socket, "MAIL FROM: <$from>\r\n");
fgets($socket);
fputs($socket, "RCPT TO: <$recipient>\r\n");
fgets($socket);
fputs($socket, "DATA\r\n");
fgets($socket);
fputs($socket, "Subject: $subject\r\n$headers\r\n$message\r\n.\r\n");
fgets($socket);
fputs($socket, "QUIT\r\n");
$response = fgets($socket);

if (str_starts_with($response, "250")) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed: $response";
}

fclose($socket);
?>

