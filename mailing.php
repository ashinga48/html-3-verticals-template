<?php

header('Access-Control-Allow-Origin: *');  

$array = array("error" => "1");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $nameErr = "Name is required";
  if (empty($_POST["name"])) {
    $array = array("error" => "1", "message" => $nameErr);
    echo json_encode($array);
    die();
    } else {
    $name = htmlspecialchars($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z0-9 ]*$/",$name)) {
      echo json_encode($array);
        die();
    }
  }
  
    $nameErr = "Email is required";
  if (empty($_POST["email"])) {
    $array = array("error" => "1", "message" => $nameErr);
    echo json_encode($array);
    die();
    } else {
    $name = htmlspecialchars($_POST["email"]);
    // check if name only contains letters and whitespace
    if (!filter_var($name, FILTER_VALIDATE_EMAIL)) {
      echo json_encode($array);
        die();
    }
  }
  
  
  require './PHPMailer-master/PHPMailerAutoload.php';

    $mail = new PHPMailer;

    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'serveraddress';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'sample@website.com';                 // SMTP username
    $mail->Password = 'password';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    $mail->setFrom('contact@ynotss.com', 'YNOT Software Solutions');
    $mail->addAddress(''.$_POST['email'], ''.$_POST['name']);     // Add a recipient
    //$mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('contact@ynotss.com', 'Reply');
    //$mail->addCC('cc@example.com');
    $mail->addBCC('vinodchand23@gmail.com');
    //
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'YNOT SOFTWARE SOLUTIONS Enquiry';
    //$mail->Body    = 'Dear #name, <br/><br/>Thanks for contacting YNOT Software Solutions. <br/><br/>We are pleased to receive your e-mail and would reply on your query shortly.<br/><br/><br/>Thanks & Regards<br/>YNOT Software Solution<br/>';
    //$mail->AltBody = 'Thanks for contacting YNOT Software Solutions. We are pleased to receive your e-mail and would reply on your query shortly.Thanks & RegardsYNOT Software Solution';
    $mail->Body = "Dear ".$_POST['name']."<br/><br/>Thanks for contacting YNOT Software Solutions. <br/><br/>We are pleased to receive your e-mail and would reply on your query shortly.<br/><br/>Your Message <br/> <strong>".$_POST['message']."</strong><br/><br/><br/>Thanks & Regards<br/>YNOT Software Solution<br/>";
    $mail->AltBody = "Thanks for contacting YNOT Software Solutions. We are pleased to receive your e-mail and would reply on your query shortly.Thanks & RegardsYNOT Software Solution".$_POST['message'];

    if(!$mail->send()) {
        $array = array("error" => "1", "message" => $mail->ErrorInfo);
        echo json_encode($array);
       // echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
       $array = array("error" => "0", "message" => "Mail Sent");
        echo json_encode($array);
    }


}

/*
 
require './PHPMailer-master/PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'p3plcpnl0426.prod.phx3.secureserver.net';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'info@ahub.co.in';                 // SMTP username
$mail->Password = '+neeuVVg[X3[';                           // SMTP password
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('ashinga48@gmail.com', 'YNOTSS');
$mail->addAddress('kesanam.ravi@gmail.com', 'Ravi');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo('contact@ynotss.com', 'Reply');
//$mail->addCC('cc@example.com');
$mail->addBCC('ashinga48@gmail.com');
//
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'YNOT SOFTWARE SOLUTIONS Enquiry';
$mail->Body    = 'Dear #name, <br/><br/>Thanks for contacting YNOT Software Solutions. <br/><br/>We are pleased to receive your e-mail and would reply on your query shortly.<br/><br/><br/>Thanks & Regards<br/>YNOT Software Solution<br/>';
$mail->AltBody = 'Thanks for contacting YNOT Software Solutions. We are pleased to receive your e-mail and would reply on your query shortly.Thanks & RegardsYNOT Software Solution';
//$mail->Body = "test message";
//$mail->AltBody = "messsage";

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

*/

?>