document.addEventListener('DOMContentLoaded', () => {


    // function updateButtonLabel(logueado) {
    //     if (logueado) {
    //         longinbuttonlabel.textContent = "Cerrar sesión";
    //     } else {
    //         longinbuttonlabel.textContent = "Iniciar sesión";
    //     }
    // }
    const elementoMostrarCorreo = document.createElement('span');
    elementoMostrarCorreo.id = "correoMensajeLogueado"
// Función inicio de sesión
function login() {
    // Obtiene los valores del correo electrónico y la contraseña
    const userEmail = document.getElementById("useremail").value;
    const userPassword = document.getElementById("userpassword").value;
  
    // Verificar si el correo electrónico y la contraseña no están vacíos
    if (userEmail !== "" && userPassword !== "") {
      // Almacena el estado de inicio de sesión en el almacenamiento local
      localStorage.setItem("logueado", "true");
      // Guardamos el correo ingresado con la clave "email"
      localStorage.setItem("email", userEmail);
  
      // Actualiza la etiqueta del botón de inicio de sesión para que muestre cerrar sesión
      const longinbuttonlabel = document.getElementById("longinbuttonlabel");
      longinbuttonlabel.textContent = "Cerrar sesión";
  
      // Oculta la etiqueta de crear cuenta
      const botonCrearCuenta = document.getElementById("botonCrearCuenta");
      const barranav = document.getElementById("navbarNav");
      // Ocultar el botón cambiando su estilo
      botonCrearCuenta.style.display = "none";
  
      // Oculta el formulario de iniciar sesión
      const containerPopup = document.querySelector('.container-popup');
      containerPopup.style.display = 'none';
  
      // Crear un elemento que muestre un saludo al usuario (Correo Loggeado)
      
      barranav.appendChild(elementoMostrarCorreo);
      // Modificamos la classe para mostrarlo y traemos el valor del locar storage
      elementoMostrarCorreo.className = 'nav-link text-white';
      elementoMostrarCorreo.textContent = 'Bienvenido: ' + localStorage.getItem('email');
    }
  }
  
  // Función para el cierre de sesión
  function logout() {
    // Elimina el estado de inicio de sesión del almacenamiento local
    localStorage.removeItem("logueado");
    localStorage.removeItem("email");
  
    // Actualiza la etiqueta del botón por inicio de sesión
    const longinbuttonlabel = document.getElementById("longinbuttonlabel");
    longinbuttonlabel.textContent = "Iniciar sesión";
  
    // Muestra nuevamente el formulario de inicio de sesión
    const containerPopup = document.querySelector('.container-popup');
    containerPopup.style.display = 'block';
  
    // Muestra nuevamente el botón de crear usuario 
    const botonCrearCuenta = document.getElementById("botonCrearCuenta");

    // Ocultar el botón cambiando su estilo
    botonCrearCuenta.style.display = "block";

    // Ocultar el mensaje Cambiando su estio 
    const elementoMostrarCorreo = document.getElementById("correoMensajeLogueado")
    //elementoMostrarCorreo.style,display = 'none';
    elementoMostrarCorreo.parentNode.removeChild(elementoMostrarCorreo)

  }
  

    // Agregar evento click al botón loginbutton
    const loginbutton = document.getElementById("loginbutton");
    if (loginbutton) {
        loginbutton.addEventListener('click', () => {
            // Verifica si el usuario ya está logueado
            if (localStorage.getItem("logueado")) {
                // Realiza el proceso de cierre de sesión
                logout();
            } else {
                login();
            }
        });
    }


    // Agregar evento click al botón longinbuttonlabel (que ahora dice "Cerrar sesión")
    const longinbuttonlabel = document.getElementById("longinbuttonlabel");
    if (longinbuttonlabel) {
        longinbuttonlabel.addEventListener('click', () => {
            // Realiza el proceso de cierre de sesión al hacer clic en "Cerrar sesión"
            logout();
        });
    }

    // Verificar y actualizar la etiqueta del botón cuando la página carga
    // const userlogueado = localStorage.getItem("logueado");
    // updateButtonLabel(userlogueado === "true");
});

