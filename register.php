<?php
    require "vendor/autoload.php";

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    //Default response
    $status = "400";
    $response = array(
        "result" => "error", 
        "message" => "Todos los campos son requeridos"
    );
    
    //Validation
    if($name && $email && $phone && $message){
        //Format message
        $msg  = "Nombre: $name\n";
        $msg .= "Email: $email\n";
        $msg .= "Teléfono: $phone\n";
        $msg .= "Mensaje: $message\n";

        //Send mail
        $oEmail = new \SendGrid\Mail\Mail();
        $oEmail->setSubject("Arriendo apto Mondrián");
        $oEmail->addTo("kerlynhans@gmail.com");
        $oEmail->addContent("text/plain", $msg);

        $sendgrid = new \SendGrid(getenv("SENDGRID_API_KEY"));
        try{
            $response = $sendgrid->send($oEmail);
            $status = "200";
            $response["result"] = "success";
            $response["message"] = "ok";
        }catch(Exception $e){
            $response["message"] = $e->getMessage();
        }  
    }

    //Output response
    http_response_code($status);
    echo json_encode($response);
?>