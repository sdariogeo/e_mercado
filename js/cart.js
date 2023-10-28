document.addEventListener("DOMContentLoaded", () => {
  const cartUrl =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  //cambio los input type radio de metodos de pago
  const radioCreditCard = document.getElementById("credit-card");
  const radioWideTransfer = document.getElementById("wide-transfer");
  const cardNumberInput = document.getElementById("card-number");
  const securityCodeInput = document.getElementById("security-code");
  const expirationDateInput = document.getElementById("expiration-date");
  const accountNumberInput = document.getElementById("account-number");

  radioCreditCard.addEventListener("change", function () {
    if (radioCreditCard.checked) {
      cardNumberInput.disabled = false;
      securityCodeInput.disabled = false;
      expirationDateInput.disabled = false;
      accountNumberInput.disabled = true;
    } 
  });
  radioWideTransfer.addEventListener("change", function () {
    if (radioWideTransfer.checked) {
      cardNumberInput.disabled = true;
      securityCodeInput.disabled = true;
      expirationDateInput.disabled = true;
      accountNumberInput.disabled = false;
    } 
  });


  // Realizar la solicitud Fetch para obtener el carrito de compras
  fetch(cartUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el carrito de compras.");
      }
      return response.json();
    })
    .then((data) => {
      const user = data.user;
      const articles = data.articles;

      if (articles.length > 0) {
        const carritoElement = document.getElementById("Articulos");
        const tableBody = carritoElement.querySelector("tbody");

        articles.forEach((producto) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <th scope="row"><img width="50" src="${producto.image}" alt="Imagen del producto"></th>
            <td>${producto.name}</td>
            <td class="costo">${producto.unitCost}</td>
            <td><input type="number" class="cantidadInput" product-id="${producto.id}" value="${producto.count}" style="width: 50px; text-align: center" min="0"></td>
            <td>${producto.currency}</td>
            <td class="subTotal">${producto.unitCost}</td>
          `;
          tableBody.appendChild(row);

          // Agregar evento change a cada input de cantidad
          const cantidadInput = row.querySelector(".cantidadInput");
          cantidadInput.addEventListener("change", () => {
            actualizarPrecio(cantidadInput);
          });
        });

        // Función para actualizar subtotal en base al change de cantidad
        function actualizarPrecio(input) {
          const row = input.closest("tr");
          const subtotalElement = row.querySelector(".subTotal");
          const cantidad = input.value;
          const costo = row.querySelector(".costo").innerText;
          subtotalElement.innerText = cantidad * costo;
        }
      } else {
        console.error("El carrito de compras está vacío.");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // Max add: contenido respectivo para hacer los controles gráficos de envío y dirección
  function addGraphicsControls() {
    const formShipping = document.getElementById("formShipping");
    formShipping.innerHTML = `
      <br>
      <div class="row">
        <!--INGRESO DE DATOS DE DIRECCIÓN, NÚMERO Y CALLE-->
        <div class="shippingAddress col-6 mx-auto">
          <h4>Dirección de envío</h4>
          <label class="label-calle">Calle</label>
          <div class="invalid-feedback">Debe ingresar una calle</div>
          <div class="input-group mb-3">
            <input id="calle" type="text" class="form-control" aria-label="Street name input" aria-describedby="inputGroup-sizing-default" required>
              <div class="invalid-feedback">Ingresa una calle</div>
            </div>
          <label class="label-numero">Número</label>
          <div class="input-group mb-3">
            <input id="numero" type="text" class="form-control" aria-label="Street number input" aria-describedby="inputGroup-sizing-default" required>
              <div class="invalid-feedback">Ingresa un número</div>
            </div>
          <label class="label-esquina">Esquina</label>
          <div class="input-group mb-3">
            <input id="esquina" type="text" class="form-control" aria-label="Corner street name input" aria-describedby="inputGroup-sizing-default" required>
              <div class="invalid-feedback">Ingresa una esquina</div>
            </div>
        </div>
        <!--FORMULARIO DE SELECCIÓN DE TIPO DE ENVÍO-->
        <div class="form-container col-5 mx-auto pt-5">    
          <h4>Tipo de envío</h4>
          <div class="form-check d-flex align-items-center mb-3 mt-4">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
            <label class="form-check-label mt-1" for="flexRadioDefault1">
               Premium 2 a 5 días (15%)
            </label>
          </div>
          <div class="form-check  d-flex align-items-center mb-3">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
            <label class="form-check-label mt-1" for="flexRadioDefault2">
              Express 5 a 8 días (7%)
            </label>
          </div>
          <div class="form-check  d-flex align-items-center mb-3">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
            <label class="form-check-label mt-1" for="flexRadioDefault3">
              Standard 12 a 15 días (5%)
            </label>
          </div>
        </div>
      </div>`;

  }
   addGraphicsControls();

  const btnForm = document.getElementById('Comprar');
  const inputCalle = document.getElementById("calle");
  const inputNumero = document.getElementById("numero");
  const inputEsquina = document.getElementById("esquina");
  const dividCardselect = document.getElementById("cardselect");
  
    
      btnForm.addEventListener("click", function (e) {
          e.preventDefault();
          console.log('Se hizo click en el botón de comprar');
  
          let valorCalle= inputCalle.value;
          let valorNumero = inputNumero.value;
          let valorEsquina = inputEsquina.value;
          let valorCardselect = dividCardselect.value; //esto se puede borrar porque no se está usando
          
  
          if (valorCalle == "") {            
              inputCalle.classList.remove("is-valid");
              inputCalle.classList.add("is-invalid");
          } else {
              inputCalle.classList.remove("is-invalid");
              inputCalle.classList.add("is-valid");
          }

          if (valorNumero == "") {            
            inputNumero.classList.remove("is-valid");
            inputNumero.classList.add("is-invalid");
          } else {
            inputNumero.classList.remove("is-invalid");
            inputNumero.classList.add("is-valid");
          }
          if (valorEsquina == "") {            
            inputEsquina.classList.remove("is-valid");
            inputEsquina.classList.add("is-invalid");
          } else {
            inputEsquina.classList.remove("is-invalid");
            inputEsquina.classList.add("is-valid");
          }
          if((radioCreditCard.checked && cardNumberInput!="" && securityCodeInput!="" && expirationDateInput!="") || (radioWideTransfer.checked && accountNumberInput!="")){
            dividCardselect.classList.remove("is-invalid");
            dividCardselect.classList.add("is-valid");
          } else {
            dividCardselect.classList.remove("is-valid");
            dividCardselect.classList.add("is-invalid");
          }

          const allValids = document.querySelectorAll('.is-valid').length === 4;
          if (allValids) {
            success.classList.remove("d-none");
            setTimeout(() => {
            success.classList.add("d-none");
            }, 4000);
          }
        });
      });


  