// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');


// Event Listeners

eventListeners();

function eventListeners(){
    // Inicio de la aplicacion y desabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);
    // Campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // boton enviar en el submit
    btnEnviar.addEventListener('click', enviarEmail); 
    // formularioEnviar.addEventListener('submit', enviarEmail); --> tambien lo podias haber hecho asi

    // boton de reset
    btnReset.addEventListener('click', reset);
}



// Funciones

function inicioApp(){
    // Desabilitar el envio
    btnEnviar.disabled = true;
}

// valida que el campo tenga algo escrito
function validarCampo(){

    // Se valida la longitud del texto y que no este vacio
    validarLongitud(this);

    // Validar unicamente el email
    if(this.type === 'email'){
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');
    if(email.value !== "" && asunto.value !== "" && mensaje.value !== ""){
        if(errores.length === 0){
            btnEnviar.disabled = false;
        }
    }
}

// cuando se envia el correo
function enviarEmail(e){
    // Spinner al presionar enviar
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    // Gif que envia el email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    // ocultar spinner y mostrar gif de enviado
    setTimeout(function() {
        spinner.style.display = 'none';
        document.getElementById('loaders').appendChild(enviado);

        setTimeout(function(){
            enviado.remove();
            formularioEnviar.reset();
        }, 3000);
        
    }, 2500);

    e.preventDefault();
}

// Verifica la longitud del texto en el campo
function validarLongitud(campo){

    if(campo.value.length > 0){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// validando que el Email tenga un @ y un .
function validarEmail(campo){
    const mensaje = campo.value;
    if(mensaje.indexOf('@') !== -1 && mensaje.indexOf('.') !== -1 ){
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else{
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// resetear el formulario
function reset(e){
    formularioEnviar.reset();
    e.preventDefault();
}
