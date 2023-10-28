document.addEventListener("DOMContentLoaded", () => {
  // Obtén el carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  

  // Selecciona el elemento donde se mostrará el carrito en cart.html
  const carritoElement = document.getElementById("Articulos");
  const tableBody = carritoElement.querySelector("#Articulos tbody");

  const cartUrl = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

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


    

  // Verifica si el carrito tiene productos
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <th scope="row"><img width="50" src="${producto.images[0]}" alt="Imagen del producto"></th>
        <td>${producto.name}</td>
        <td class="costo">${producto.cost}</td>
        <td><input type="number" class="cantidadInput" product-id="${producto.id}" value="1" style="width: 50px; text-align: center" min="0"></td>
        <td>${producto.currency}</td>
        <td class="subTotal">${producto.cost}</td>
        <button class="btn btn-outline-secondary bi bi-trash button-delete" id="button-delete"></button>
      `;
      tableBody.appendChild(row);

      // Agregar evento change a cada input de cantidad
      const cantidadInput = row.querySelector('.cantidadInput');
      cantidadInput.addEventListener('change', () => {
        actualizarPrecio(cantidadInput);
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
    const cantidad = input.value;
    const costo = row.querySelector('.costo').innerText;
    subtotalElement.innerText = cantidad * costo;
  }
  
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
  }
  }


  // Max add: contenido respectivo para hacer los controles gráficos de envío y dirección
  function addGraphicsControls() {
    const anotherRow = document.createElement('div');
    const tipoyDireccion = document.getElementById("tipoyDireccion");
    anotherRow.innerHTML = `
      <br>
      <div class="row">
        <!--INGRESO DE DATOS DE DIRECCIÓN, NÚMERO Y CALLE-->
        <div class="shippingAddress col-5 mx-auto">
          <h4>Dirección de envío</h4>
          <label class="label-calle">Calle</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Street name input" aria-describedby="inputGroup-sizing-default">
          </div>
          <label class="label-numero">Número</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Street number input" aria-describedby="inputGroup-sizing-default">
          </div>
          <label class="label-esquina">Esquina</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Corner street name input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
        <!--FORMULARIO DE SELECCIÓN DE TIPO DE ENVÍO-->
        <div class="form-container col-6 mx-auto pt-5">    
          <h4>Tipo de envío</h4>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
            <label class="form-check-label" for="flexRadioDefault1">
              Premium 2 a 5 días (15%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
            <label class="form-check-label" for="flexRadioDefault2">
              Express 5 a 8 días (7%)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
            <label class="form-check-label" for="flexRadioDefault3">
              Standard 12 a 15 días (5%)
            </label>
          </div>
        </div>
      </div>`;

    tipoyDireccion.appendChild(anotherRow);
  }

  addGraphicsControls();
})
});
