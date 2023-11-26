document.addEventListener("DOMContentLoaded", () => {
  const cartUrl = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


  //Elementos para el resumen de compra
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoElement = document.getElementById("Articulos");
  const tableBody = carritoElement.querySelector("#Articulos tbody");
  const subTotalCost = document.getElementById('subTotal');
  const shippingCostLabel = document.getElementById('costoEnvio');
  const totalCost = document.getElementById('totalCompra');
  const shipTypes = document.getElementsByClassName('form-check-input');
  const conversionValueUSD = 40;
  let shippingCost = 0;

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
    summarySubCost();
    sumatoriaTotal();
    calcShipping();
  });
  radioWideTransfer.addEventListener("change", function () {
    if (radioWideTransfer.checked) {
      cardNumberInput.disabled = true;
      securityCodeInput.disabled = true;
      expirationDateInput.disabled = true;
      accountNumberInput.disabled = false;
    }
    summarySubCost();
    sumatoriaTotal();
    calcShipping();
  });


  // Agregar evento change a cada tipo de envio
  const formShipping = document.getElementById("formShipping");
  
  formShipping.addEventListener("change", function () {
  // Llama a las funciones necesarias para actualizar el resumen
  summarySubCost();
  sumatoriaTotal();
  calcShipping();
});


  //funcion para calcular el Subtotal en el resumen de compra

  function summarySubCost() {
    const productosCarrito = tableBody.querySelectorAll('tr');
    let subcost = 0;

    productosCarrito.forEach((fila) => {
      const subtotalElement = fila.querySelector('.subTotal');
      const monedaElement = fila.querySelector('.moneda');
      const totalcostsimple = parseFloat(subtotalElement.innerText);
  
      // Convertir a dólares si la moneda original es USD
      if (monedaElement.innerText === "USD") {
        subcost += totalcostsimple;
      } else {
        subcost += totalcostsimple / conversionValueUSD;
      }
    });
  
    // Mostrar el subtotal en dólares
    subTotalCost.innerHTML = subcost.toFixed(2);
  }

  //Funcion para calcular el envío.
  function calcShipping() {

    let subtotal = parseInt(subTotalCost.innerText);

    if (shipTypes[0].checked) {

      shippingCost = Math.round(shipTypes[0].value * subtotal);     
      
    }
      
    
    if (shipTypes[1].checked) {
      shippingCost = Math.round(shipTypes[1].value * subtotal);     
      
    }
    
    if (shipTypes[2].checked) {
      shippingCost = Math.round(shipTypes[2].value * subtotal);
      
    
    }

    shippingCostLabel.innerHTML = shippingCost;
    
  }

  //Funcion para calcular el total

  function sumatoriaTotal() {
    const sumatoria = parseInt(subTotalCost.innerText) + shippingCost;
    totalCost.innerHTML = sumatoria;
    console.log(sumatoria)

      }

  // Realizar la solicitud Fetch para obtener el carrito de compras
  fetch(cartUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el carrito de compras.");
      }
      return response.json();
    })
    .then((data) => {
      /* const user = data.user; */
      const articuloDefecto = data.articles;

      console.log("Productos del carrito de origen:", articuloDefecto);
  
      // Itera sobre los productos y agrega individualmente al carrito
      carrito.forEach((producto) => {
        articuloDefecto.push(producto);
      });
  
      // Restaura el carrito actualizado en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
  

      console.log("Carrito actualizado:", carrito);

//Tomo los datos del producto en un objeto, la función 
//consulta las propiedades correspondientes de cada clave
function arrayCart () {
  for (let i = 0; i < carrito.length; i++){
    const productData = {
      name: carrito[i].name,
      cost: carrito[i].cost,
      currency: carrito[i].currency
  }
  console.log("hola, estos son los datos", productData);
  let myHeaders = new Headers();
  myHeaders.append("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1ZW5kZSIsImlhdCI6MTcwMTAxNjI0OH0.TS2ugHluQrHAuqfH_IBb4N8cwYxERHCfS-IIC7NNXcE");
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body:JSON.stringify(productData),
    redirect: 'follow'
  };
//Se realiza el fetch con solicitud POST que envía el objeto
  fetch("http://localhost:3000/cart", requestOptions)
    .then(response => response.json())
    .then(result => console.log("el producto ha sido enviado",result))
    .catch(error => console.log('error', error));
}
//---fin de la solicitud POST
}
//Se llama la función 
arrayCart ();

  // Verifica si el carrito tiene productos
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <th scope="row"><img width="50" src="${producto.images[0]}" alt="Imagen del producto"></th>
        <td>${producto.name}</td>
        <td class="costo">${producto.cost}</td>
        <td><input type="number" class="cantidadInput" product-id="${producto.id}" value="1" style="width: 50px; text-align: center" min="0"></td>
        <td class="moneda">${producto.currency}</td>
        <td class="subTotal">${producto.cost}</td>
        <button class="btn btn-outline-secondary bi bi-trash button-delete" id="button-delete"></button>
      `;
      tableBody.appendChild(row);

      // Agregar evento change a cada input de cantidad
      const cantidadInput = row.querySelector('.cantidadInput');
      cantidadInput.addEventListener('change', () => {
        actualizarPrecio(cantidadInput);
        /* summarySubCost()
        sumatoriaTotal()
        calcShipping() */
      });

      const botonBorrarCarrito = row.querySelector(".button-delete");
    botonBorrarCarrito.addEventListener("click", () => {
      borrarArticuloCarrito(producto.id);
    });
  });
  } else {
    console.error("El carrito de compras está vacío.");
  }

  // Función para actualizar subtotal en base al cambio de cantidad
  function actualizarPrecio(input) {
    
    const row = input.closest('tr');
    const subtotalElement = row.querySelector('.subTotal');
    const monedaElement = row.querySelector('.moneda');
    const moneda = monedaElement.innerText;
    const cantidad = input.value;
    const costo = row.querySelector('.costo').innerText;
    // Calcular el subtotal en la moneda original
  const subtotalOriginal = cantidad * costo;

  // Mostrar el subtotal en la moneda original
  subtotalElement.innerText = subtotalOriginal;
      
  
    summarySubCost()
    sumatoriaTotal()
    calcShipping()
  };
  
  
  
  function borrarArticuloCarrito(productId){
    const index = carrito.findIndex((producto) => producto.id === productId);
  
  if (index !== -1) {
    // Elimina articulo del carrito
    carrito.splice(index, 1);
    
    // Elimina la fila correspondiente de la tabla
    const rows = tableBody.getElementsByTagName('tr');
    const rowToDelete = rows[index];
    if (rowToDelete) {
      rowToDelete.remove();
    }
    
    // Actualiza el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
  summarySubCost();
    sumatoriaTotal();
    calcShipping();
  }
  }

  

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
        <div class="form-container col-6 mx-auto pt-5">
          <h4>Tipo de envío</h4>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="0.15">
            <label class="form-check-label" for="flexRadioDefault1">
              Premium 2 a 5 días (15%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="0.07">
            <label class="form-check-label" for="flexRadioDefault2">
              Express 5 a 8 días (7%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="0.05" checked>
            <label class="form-check-label" for="flexRadioDefault3">
              Standard 12 a 15 días (5%)
            </label>
          </div>
        </div>
      </div>`;

  }
  addGraphicsControls();
  summarySubCost();
    sumatoriaTotal();
    calcShipping();
  const btnForm = document.getElementById('Comprar');
  const inputCalle = document.getElementById("calle");
  const inputNumero = document.getElementById("numero");
  const inputEsquina = document.getElementById("esquina");
  const dividCardselect = document.getElementById("cardselect");


  btnForm.addEventListener("click", function (e) {
    e.preventDefault();
    console.log('Se hizo click en el botón de comprar');

    let valorCalle = inputCalle.value;
    let valorNumero = inputNumero.value;
    let valorEsquina = inputEsquina.value;


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
    if ((radioCreditCard.checked && cardNumberInput.value != "" && securityCodeInput.value != "" && expirationDateInput.value != "") || (radioWideTransfer.checked && accountNumberInput.value != "")) {
      dividCardselect.classList.remove("is-invalid");
      dividCardselect.classList.add("is-valid");
    } else {
      dividCardselect.classList.remove("is-valid");
      dividCardselect.classList.add("is-invalid");
    }

    const allValids = document.querySelectorAll('.is-valid').length === 4;
    if (allValids) {
      success.classList.remove("d-none");
      success.style.position = "absolute";
      success.style.top = "600px";
      success.style.zIndex = "100";
      setTimeout(() => {
        success.classList.add("d-none");
        success.style.position = "absolute";
        success.style.top = "600px";
        success.style.zIndex = "100";
      }, 4000);
    }
  });
});

});


