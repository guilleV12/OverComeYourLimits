//toast
const toast = (texto) => {
    Toastify({
        text: texto,
        duration: 2000,
        gravity: 'top',
        position: 'center',
        }).showToast();
}

//si el formulario existe y se valida correctamente, se envia a una api de prueba
export function manejoForm() {
    let formulario = document.querySelector('form');
    let btnEnviarContacto = document.querySelector('.enviar-contacto');

    btnEnviarContacto.addEventListener('click',async (e)=>{
        e.preventDefault();
        if (validarInputs()) {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: nombre.value,
                        apellido: apellido.value,
                        email: email.value,
                        mensaje: mensaje.value
                    })
                });

                const data = await response.json();
                console.log('Respuesta del servidor:', data);
            } catch (error) {
                console.log(error);
            } finally {
                formulario.reset();
                toast('Mensaje enviado!');
            }
        }
    })
}

//validacion de formulario
function validarInputs() {
    let nombre = document.querySelector('#nombre');
    let nombreSpan = document.querySelector('.nombre-span');
    let apellido = document.querySelector('#apellido');
        let apellidoSpan = document.querySelector('.apellido-span');
    let email = document.querySelector('#email');
        let emailSpan = document.querySelector('.email-span');
    let mensaje = document.querySelector('#mensaje');
        let mensajeSpan = document.querySelector('.mensaje-span');

    if (nombre.value.length < 4) {
        nombre.style.backgroundColor= 'lightcoral';
        nombreSpan.style.display= 'block';
        return false;
    } else {
        nombre.style.backgroundColor= 'white';
        nombreSpan.style.display= 'none';
    }

    if (apellido.value.length < 4) {
        apellido.style.backgroundColor= 'lightcoral';
        apellidoSpan.style.display= 'block';
        return false;
    } else {
        apellido.style.backgroundColor= 'white';
        apellidoSpan.style.display= 'none';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.style.backgroundColor= 'lightcoral';
        emailSpan.style.display= 'block';
        return false;
    } else {
        email.style.backgroundColor= 'white';
        emailSpan.style.display= 'none';
    }

    if (mensaje.value.length < 10) {
        mensaje.style.backgroundColor= 'lightcoral';
        mensajeSpan.style.display= 'block';
        return false;
    } else {
        mensaje.style.backgroundColor= 'white';
        mensajeSpan.style.display= 'none';
    }

    return true;
}