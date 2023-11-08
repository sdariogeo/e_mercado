// Colocar en el input el valord el local storage
document.addEventListener("DOMContentLoaded", function() {
const Email = document.getElementById("E-mail");
const valorLocalStorage = localStorage.getItem("email");
Email.value = valorLocalStorage;
});