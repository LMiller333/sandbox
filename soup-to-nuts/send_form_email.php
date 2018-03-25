<?php
if(isset($_POST['formEmail'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "lmm566@gmail.com";
    $email_subject = "SOUP TO NUTS LEAD";
 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
    // validation expected data exists
    if(!isset($_POST['formName']) ||
        !isset($_POST['formEmail']) ||
        !isset($_POST['formPhone'])){
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
    $formName = $_POST['formName']; // required
    $formEmail = $_POST['formEmail']; // required
    $formPhone = $_POST['formPhone']; // required    
 
    $email_message = "Form details below.\n\n";
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
    $email_message .= "Name: ".clean_string($formName)."\n";
    $email_message .= "Email: ".clean_string($formEmail)."\n";
    $email_message .= "Phone: ".clean_string($formPhone)."\n";   
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
sleep(2);
echo "<meta http-equiv='refresh' content=\"0; url="http://tutsme-webdesign.info/index.php"\">";
?>
 
<?php
}
?>