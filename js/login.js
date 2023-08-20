document.addEventListener('DOMContentLoaded', function () {


  function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
  }

  function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
  }


  /*const form = document.querySelector("form-label");
  Comenté esta constante porque no hago uso de la misma*/
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");
  const password2 = document.getElementById("password2");

  /*const button = document.getElementById('regBtn');
  Comenté esta constante porque no lo estamos utilizando, en este caso estamos
  poniéndole el evento submit al formulario */

  const formula = document.getElementById('formulario');
  /*const para = document.querySelector("alert-danger");   
  Esta constante también está comentada porque no hago uso de la misma*/

  formula.addEventListener("submit", (event) => {

    event.preventDefault();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&\s])([A-Za-z\d$@$!%*?&]|[^ ]){6,15}/;

    /*FC: Utilizo trim() para eliminar espacios en blanco.
    Utilizo regex para permitir el uso de diferentes símbolos en la contraseña
    Utilicé el método test para comprobar que la cadena coincide con lo que pide
    una expresión regular, esta devuelve true o false*/

    if (nombre.value.trim() === "" ||
      apellido.value.trim() === "" ||
      email.value.trim() === "" ||
      !regex.test(password1.value) ||
      !regex.test(password2.value) ||
      !terminos.checked ||
      password1.value.trim() !== password2.value.trim() ||
      password1.value.trim().length < 6) {

      /*FC: problema a solucionar, no se valida la contraseña cuando
      las contraseñas tienen espacios en blanco en distintos lugares
      de las cadenas*/

      showAlertError();

    } else {

      /*Se añadió formula.reset() para reiniciar los campos del formulario*/

      formula.reset();
      showAlertSuccess();
      localStorage.setItem("logueado", "true")
      window.location.href = "index.html";
    }


  })
});

/*Ejemplos de algunas contraseñas que cumplen con los requisitos:
 
A123456.or% P123@.wo Abc123$ Pa$$w0rd MyP@ss123 Secur3P@ss*/

function togglePopup() {

  document.getElementById("login-button")

    .classList.toggle("active");

}

/*FC:  Aquí voy a trabajar lo que es la validación de la contraseña*/

const length = document.getElementById('length');
const special = document.getElementById('special');
const number = document.getElementById('number');
const mayus = document.getElementById('mayus');
const minus = document.getElementById('minus');

password1.addEventListener('input', function () {

  /*Condición del largo*/
  if (password1.value.length >= 6) {

    length.classList.remove('invalid');
    length.classList.add('valid');

  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");

  }

  /*Condición de letras mayúsculas
  match(): busca coincidencias entre la cadena de texto 
  y expresiones regulares, devuelve un arreglo con las coincidencias
  encontradas o null si no hay coincidencias*/

  let mayusculas = /[A-Z]/;
  if (password1.value.match(mayusculas)) {
    console.log("Coincidencias encontradas:", password1.value.match(mayusculas));
    mayus.classList.remove('invalid');
    mayus.classList.add('valid');

  } else {

    mayus.classList.remove("valid");
    mayus.classList.add("invalid");

  }

  /*Condción de letras minúsculas*/

  let minusculas = /[a-z]/;
  if (password1.value.match(minusculas)) {

    minus.classList.remove('invalid');
    minus.classList.add('valid');
  } else {
    minus.classList.remove("valid");
    minus.classList.add("invalid");
  }

  /*Condición del caracter especial*/
  let especiales = /[$@$!%*?&]/;

  if (password1.value.match(especiales)) {

    special.classList.remove('invalid');
    special.classList.add('valid');
  } else {
    special.classList.remove("valid");
    special.classList.add("invalid");
  }

  /*Condición de al menos un número*/
  let numbers = /(?=.*\d)/;

  if (password1.value.match(numbers)) {

    number.classList.remove('invalid');
    number.classList.add('valid');
  } else {

    number.classList.remove("valid");
    number.classList.add("invalid");
  }

});

/*Estas funciones sirven para mostrar el mensaje de 
validación cuando el usuario hace focus y cuando deja de hacerle 
focus al input*/
password1.onblur = function myBlur() {
  document.getElementById("mensaje").style.display = "none";
  document.getElementById("password2").style.visibility = "visible";
}

password1.onfocus = function myFocus() {
  document.getElementById("mensaje").style.display = "block";
  document.getElementById("password2").style.visibility = "hidden";
}



/*funcion ojitos de registro*/

function mostrarPassword() {
  var tipo = document.getElementById("password1");
  if (tipo.type == "password") {
    tipo.type = "text"
  } else {
    tipo.type = "password";
  }
}

function mostrarPassword2() {
  var tipo = document.getElementById("password2");
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }
}
