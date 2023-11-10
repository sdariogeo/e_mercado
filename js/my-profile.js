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

//Para almacenar la imagen debo pasarla a base64
const imagenPerfil = document.getElementById("ImagenPerfil");
const valorImagen = localStorage.getItem("imagenPerfil");
const imageTag = document.getElementById("imgProfile");

if (valorImagen !== null) {
    imageTag.src = valorImagen
};
 
imagenPerfil.addEventListener("change", function () {
    // Lee el archivo seleccionado como una cadena base64
    const archivo = this.files[0];
    const lector = new FileReader();
    
    lector.onloadend = function () {
      // Almacenar la cadena base64 en el localStorage
      
    imageTag.src = lector.result;

     localStorage.setItem("imagenPerfil", lector.result);
    };

    if (archivo) {
      lector.readAsDataURL(archivo);
    }
});
});


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
