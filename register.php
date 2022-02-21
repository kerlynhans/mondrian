<?php
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
        $response["message"] = "No se puede enviar el email";

        //Format message
        $msg  = "Nombre: $name\n";
        $msg .= "Email: $email\n";
        $msg .= "Teléfono: $phone\n";
        $msg .= "Mensaje: $message\n";

        //Send mail
        $success = @mail("kerlynhans@gmail.com","Arriendo apto Mondrián",$msg);
        if($success){
            $status = "200";
            $response["result"] = "success";
            $response["message"] = "ok";
        }
    }

    //Output response
    http_response_code($status);
    echo json_encode($response);
?>