
////////////////////////
// VALIDDAR CAMPO RUT //
////////////////////////

function verificarRut(rut) {
    // Despejar puntos y guión al ingresar datos
    var valor = rut.value.replace('.','');
    valor = valor.replace('-','');
    
    // Separar RUT del dígito Verificador
    rutSDv = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Dar formato al RUT 11111111-1
    rut.value = rutSDv + '-'+ dv
    
    // Si no cumple con el mínimo 1.111.111
    if(rutSDv.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calculo DV
    suma = 0;
    multiplo = 2;
    
    // Para cada número del RUT
    for(i=1;i<=rutSDv.length;i++) {
    
        // Obtener Resultado resultado = 2 * La extracción del último digito de rutSDv
        resultado = multiplo * valor.charAt(rutSDv.length - i);
        
        // Se suma cada valor obtenido de resultado
        suma = suma + resultado;
        
        // Validar la variable multiplo entre 2 y 7
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar rutSDv, coincide con su DV
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Limpiar errores si todo está correcto
    rut.setCustomValidity('');
}
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

jQuery(function() {

    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
      });
      
    jQuery( "#formulario" ).validate({
        
           rules: {
                   nombre: {
                           required: true,
                           minlength: 4,
                           maxlength: 20
                   },

                   correo: {
                           required: true,
                           email: true
                   },
                   /*rut:{
                       required: true,
                       /*remote: {
                            url: "script",
                            type: "post",
                            data: {
                                rut: function() {
                                return $( "#rut" ).val();
                                }
                            }
                        }
                    },*/
                

                    telefono: {
                            required: true,
                            minlength: 8,
                            maxlength: 12
                    }

                },
           
           messages: {
                    nombre: {
                            required: "Por favor, indica tu nombre",
                            minlength: jQuery.validator.format("Necesitamos por lo menos {0} caracteres"),
                            maxlength: jQuery.validator.format("{0} Demasiados caracteres")
                    },

                    correo: {
                            required: "Ingresa una dirección de correo electrónico",
                            email: "Correo no válido"
                    },

                    telefono: {
                            minlength: jQuery.validator.format("Necesitamos por lo menos {0} caracteres"),
                            maxlength: jQuery.validator.format("{0} Demasiados caracteres")
                    }
            }

           
    });
})

