// Colocar en el input el valord el local storage
document.addEventListener("DOMContentLoaded", function() {
const Email = document.getElementById("emailProfile");
const valorEmail = localStorage.getItem("email");
Email.value = valorEmail;

const primerNombre = document.getElementById("PrimerNombre");
const valorPrimerNombre = localStorage.getItem("primerNombre");
primerNombre.value = valorPrimerNombre;

const primerApellido = document.getElementById("PrimerApellido");
const valorPrimerApellido = localStorage.getItem("primerApellido");
primerApellido.value = valorPrimerApellido;

const segundoNombre = document.getElementById("SegundoNombre");
const valorSegundoNombre = localStorage.getItem("segundoNombre");
segundoNombre.value =valorSegundoNombre;

const segundoApellido = document.getElementById("SegundoApellido");
const valorSegundoApellido = localStorage.getItem("segundoApellido");
segundoApellido.value = valorSegundoApellido;

const telefono = document.getElementById("Telefono");
const valorTelefono = localStorage.getItem("telefono");
telefono.value = valorTelefono;



});
// CARGAR LOS DATOS DESDE LOCAL STORAGE
/*function loadSavedData () {
    
    if (Email.value == ) {
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
};*/













// GUARDAR DATOS EN EL LOCAL STORAGE
document.addEventListener("DOMContentLoaded", () => {

function guardarCambios() {
    // Obtenemos los valores del correo electrónico y la contraseña
    const primerNombre = document.getElementById("PrimerNombre").value;
    const primerApellido = document.getElementById("PrimerApellido").value;
    const segundoNombre = document.getElementById("SegundoNombre").value;
    const segundoApellido = document.getElementById("SegundoApellido").value;
    const telefono = document.getElementById("Telefono").value;

    // Verificar si el correo electrónico y la contraseña no están vacíos
    if (primerNombre !== "" && primerApellido!== "" ) {
        localStorage.setItem("primerNombre", primerNombre);
        localStorage.setItem("primerApellido", primerApellido);
        localStorage.setItem("segundoNombre", segundoNombre);
        localStorage.setItem("segundoApellido", segundoApellido);
        localStorage.setItem("telefono", telefono);
        alert('Cambios Guardados con exito!');
    } else {
        alert('Debe completar los campos obligatorios');
    }
}
    const guardar = document.getElementById("saveChanges");
    guardar.addEventListener("click",(e) => {
        e.preventDefault();
    guardarCambios();
   
});
});
