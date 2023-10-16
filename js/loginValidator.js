document.addEventListener('DOMContentLoaded', () => {
    const longinbuttonlabel = document.getElementById("longinbuttonlabel");
    const containerPopup = document.querySelector('.container-popup');
    const closeButtonX = document.getElementById("close-signIn");
    const elementoMostrarCorreo = document.createElement('div');
    elementoMostrarCorreo.id = "correoMensajeLogueado";

    // Función inicio de sesión
    function login() {
        // Obtenemos los valores del correo electrónico y la contraseña
        const userEmail = document.getElementById("useremail").value;
        const userPassword = document.getElementById("userpassword").value;

        // Verificar si el correo electrónico y la contraseña no están vacíos
        if (userEmail !== "" && userPassword !== "") {
            // Almacena el estado de inicio de sesión en el almacenamiento local
            localStorage.setItem("logueado", "true");
            // Guardamos el correo ingresado con la clave "email"
            localStorage.setItem("email", userEmail);

            // Actualiza la etiqueta del botón de inicio de sesión para que muestre cerrar sesión
            longinbuttonlabel.textContent = "Cerrar sesión";

            // Oculta la etiqueta de crear cuenta
            const botonCrearCuenta = document.getElementById("botonCrearCuenta");
            const barranav = document.getElementById("navbarNav");
            // Ocultar el botón cambiando su estilo
            botonCrearCuenta.style.display = "none";

            // Oculta el formulario de iniciar sesión
            containerPopup.style.display = 'none';

            // Crear un elemento que muestre un Dropdown al usuario loggeado
            barranav.appendChild(elementoMostrarCorreo);
            // Modificamos la clase para mostrarlo y traemos el valor del local storage
            elementoMostrarCorreo.className = 'nav-link text-white';

            //Acá se introduce el Dropdown

         const dropDownElements = `<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                ${userEmail}
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                  <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                </ul>
              </div>`;
              elementoMostrarCorreo.innerHTML = dropDownElements;
        }
    }

    // Función para cerrar la sesión
    function logout() {
        // Elimina el estado de inicio de sesión del almacenamiento local
        localStorage.removeItem("logueado");
        localStorage.removeItem("email");

        // Actualiza la etiqueta del botón por inicio de sesión
        longinbuttonlabel.textContent = "Iniciar sesión";

        // Muestra nuevamente el formulario de inicio de sesión
       

        // Muestra nuevamente el botón de crear usuario 
        const botonCrearCuenta = document.getElementById("botonCrearCuenta");

        // Mostrar el botón cambiando su estilo
        botonCrearCuenta.style.display = "block";

        // Ocultar el mensaje cambiando su estilo 
        const elementoMostrarCorreo = document.getElementById("correoMensajeLogueado");
        if (elementoMostrarCorreo) {
            elementoMostrarCorreo.remove();
        }
    }

   
    // Agregar evento click al botón loginbutton
    function logbtn() {
        const loginbutton = document.getElementById("loginbutton");
        if (loginbutton) {
            loginbutton.addEventListener('click', (event) => {
                event.preventDefault();
                // Verifica si el usuario ya está logueado
                if (localStorage.getItem("logueado") && longinbuttonlabel.textContent === "Iniciar sesión") {
                    // Realiza el proceso de cierre de sesión
                    logout();
                    containerPopup.style.display = 'block';
                } else {
                    login();
                }
            });
        }
    }

    // Evento click al botón de inicio de sesión
    longinbuttonlabel.addEventListener('click', () => {
        if (localStorage.getItem("logueado")) {
            // El usuario ya está logueado, cerrar sesión
            logout();
        } else {
            // Mostrar el formulario de inicio de sesión
            containerPopup.style.display = 'block';
        }
    });

    // Evento click al botón de cierre de sesión
    if (closeButtonX) {
        closeButtonX.addEventListener("click", function () {
            if (containerPopup.style.display === "block") {
                containerPopup.style.display = "none";
            }
        });
    }

    // Verificar y actualizar la etiqueta del botón cuando la página carga
    const prevLog = localStorage.getItem("logueado");
    if (prevLog === "true") {
        // El usuario está logueado, ejecutar keepLog para mantener la sesión
        keepLog();
    }

    // Función para mantener login con datos de inicio de sesión previos
    function keepLog() {
        const userEmail = localStorage.getItem("email");
        if (userEmail) {
            longinbuttonlabel.textContent = "Cerrar sesión";
            const botonCrearCuenta = document.getElementById("botonCrearCuenta");
            const barranav = document.getElementById("navbarNav");
            botonCrearCuenta.style.display = "none";
            containerPopup.style.display = 'none';
            barranav.appendChild(elementoMostrarCorreo);
            elementoMostrarCorreo.className = 'nav-link text-white';
            elementoMostrarCorreo.innerHTML = `<div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                ${userEmail}
                </button>
                <ul class="dropdown-menu dropdown-menu-dark w-50" aria-labelledby="dropdownMenuButton2">
                  <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                  <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                </ul>
              </div>`;
        }
    }

    logbtn();
});