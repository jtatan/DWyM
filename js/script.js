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