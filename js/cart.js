document.addEventListener("DOMContentLoaded", () => {
  const cartUrl = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


  //Elementos para el resumen de compra
  const carritoElement = document.getElementById("Articulos");
  const tableBody = carritoElement.querySelector('tbody');
  const subTotalCost = document.getElementById('subTotal');
  const shippingCostLabel = document.getElementById('costoEnvio');
  const totalCost = document.getElementById('totalCompra');
  const shipTypes = document.getElementsByClassName('form-check-input');
  let shippingCost = 0;


  //funcion para calcular el Subtotal en el resumen de compra

  function summarySubCost(){
    const productosCarrito = tableBody.querySelectorAll('tr');
    let subcost= 0;

    productosCarrito.forEach((fila) => {
    const subtotalElement= fila.querySelector('.subTotal');
    const totalcostsimple = parseFloat(subtotalElement.innerText);
    subcost += totalcostsimple;

    subTotalCost.innerHTML = subcost;
  })
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

function sumatoriaTotal(){
  const sumatoria= parseInt(subTotalCost.innerText) + shippingCost;
  totalCost.innerHTML=sumatoria;
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
      const articles = data.articles;

      if (articles.length > 0) {

        articles.forEach((producto) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <th scope="row"><img width="50" src="${producto.image}" alt="Imagen del producto"></th>
            <td>${producto.name}</td>
            <td class="costo">${producto.unitCost}</td>
            <td><input type="number" class="cantidadInput" product-id="${producto.id}" value="${producto.count}" style="width: 50px; text-align: center" min="0"></td>
            <td class="moneda">${producto.currency}</td>
            <td class="subTotal">${producto.unitCost}</td>
          `;
          tableBody.appendChild(row);

          // Agregar evento change a cada input de cantidad
          const cantidadInput = row.querySelector(".cantidadInput");
          cantidadInput.addEventListener("change", () => {
            actualizarPrecio(cantidadInput);
            summarySubCost()
            sumatoriaTotal()
          });
          
        });
        

        // Función para actualizar subtotal en base al change de cantidad
        function actualizarPrecio(input) {
          let conversionValueUSD = 40;
          const row = input.closest('tr');
          const subtotalElement = row.querySelector('.subTotal');
          const moneda = row.querySelector('.moneda').innerText
          const cantidad = input.value;
          const costo = row.querySelector('.costo').innerText;
          if(moneda == "USD"){
            subtotalElement.innerText = cantidad * costo;
          } else {
            subtotalElement.innerText = (cantidad * costo)/conversionValueUSD;
            moneda.textContent = "USD"
          }
        }

        summarySubCost()
        sumatoriaTotal()
        //Eventos para actualizar en tiempo real
        const selectShip = document.querySelectorAll('input[type="radio"]');
        selectShip.forEach((radioButton) => {
          radioButton.addEventListener('change', () => {
          console.log('El valor seleccionado ha cambiado')
          calcShipping()
          sumatoriaTotal()
        });

        })
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
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="0.05">
            <label class="form-check-label" for="flexRadioDefault3">
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
    
      btnForm.addEventListener("click", function (e) {
          e.preventDefault();
          console.log('Se hizo click en el botón de comprar');
  
          let valorCalle= inputCalle.value;
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


          const allValids = document.querySelectorAll('.is-valid').length === 3;
          if (allValids) {
            success.classList.remove("d-none");
            setTimeout(() => {
            success.classList.add("d-none");
            }, 4000);
          }
        });
      });


  