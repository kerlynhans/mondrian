$(document).ready(function(){
    //Flag
    let sending = false;

    //Set restrictions
    $('input#celular').numeric();
    $('input#documento').numeric();

    //Create form validation
    $('form#attendee').validate({
		rules : {
			'nombre' : { required:true },
			'documento' : { required:true, digits:true, minlength: 6 },
			'email' : { required:true, email:true },
			'celular' : { required:true, digits:true, minlength: 7 },
			'ciudad' : { required:true },
			'terminos' : { required:true }
		},
		messages : {
			'nombre' : { required:'Este campo es requerido' },
			'documento' : { required:'Este campo es requerido', digits:'Escribe un documento válido', minlength: 'Escribe un documento válido' },
			'email' : { required:'Este campo es requerido', email:'Verifica el email' },
			'celular' : { required:'Este campo es requerido', digits:'Escribe un celular válido', minlength: 'Escribe un celular válido' },
			'ciudad' : { required:'Este campo es requerido' },
			'terminos' : { required:'Debes aceptar el aviso de privacidad' }
		},
        errorElement: "em",
        errorClass: "failed",
		submitHandler:function(form){
            grecaptcha.ready(function() {
                grecaptcha.execute('6Ld-EqYZAAAAAOOXG_Q-woMVdHV1tmQ0BsmhWpk9', {action: 'submit'}).then(function(token) {
                    //Post data
                    var data = $('form#attendee').serializeArray();
                    data.push({"name":"token", "value":token});
                    
                    if(!sending){
                        sending = true;
                        $.post('./register', data)
                        //Success
                        .done(function() {
                            document.getElementById("attendee").reset();
                            $('.success').show();
                            sending = false;
                        })
                        //Error
                        .fail(function(err) {
                            console.log('Error is triggered', err);
                            alert( "Hay un problema enviando tus datos. Por favor intenta de nuevo más tarde." );
                            sending = false;
                        });
                    }
                });
            });
        }
    });
});
