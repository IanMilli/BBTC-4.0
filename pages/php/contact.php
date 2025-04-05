<?php


if(isset($_POST['submit'])){
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];


    $mailTo = 'imillichamp@outlook.com';
    $headers = "From: ".$email
    $txt = "You Have A Message".$firstName" ".$lastName", Subject:".$subject", Tel:".$phone", Message:".$message;
    mail($mailTo, $txt, $headers);
    header("Location: index.html?MessageSent");

}



?>