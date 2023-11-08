// Colocar en el input el valord el local storage
document.addEventListener("DOMContentLoaded", function() {
const Email = document.getElementById("emailProfile");
const valorLocalStorage = localStorage.getItem("email");
Email.value = valorLocalStorage;
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
    guardar.addEventListener("click",() => {
    guardarCambios();
   
});
});
