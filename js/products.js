// Traer los elementos del HTML de los filtros
const precioMinInput = document.getElementById("rangeFilterCountMin");
const precioMaxInput = document.getElementById("rangeFilterCountMax");
const botonFiltrar = document.getElementById("rangeFilterCount");
const limpiarFiltros = document.getElementById("clearRangeFilter");
const botonAsc = document.getElementById("sortAsc");
const botonDesc = document.getElementById("sortDesc");
const botonRelevancia = document.getElementById("sortByCount");
const searchInputProducto = document.getElementById('search-input-producto');
const searchResultsProducto = document.getElementById('search-results-producto');

let filteredProducts = [];

// Definir una función para mostrar los productos
function mostrarProductos(data) {
  // Inicializar una variable para almacenar el HTML que vamos a generar
  let listaHtml = "";

  // Iterar a través de los elementos en el arreglo "products" dentro de los datos
  data.products.forEach((item) => {
    // Generar el fragmento de HTML para mostrar la información del producto
    listaHtml += `<div class="producto" data-id="${item.id}">
     <img class="imagenProductos" src=${item.image}>

        <div class="divTexto">
            <div class="divNombre">
                <p class="nombre">${item.name}</p>
            </div>

            <div class="divDescripcion">
                <p class="descripcion">${item.description}</p>
            </div>

            <div class="divPrecio">
                <p class="precio">Precio: ${item.currency} ${item.cost}</p>
            </div>

            <div class="divVendidos">
                <p class="vendidos">Vendidos: ${item.soldCount}</p>
            </div>
        </div>
   </div>
   <hr>
      `;
  });

  // Obtener el primer elemento con la clase "lista-productos" que fue añadida en products.html
  const listaProductos = document.getElementsByClassName("lista-productos")[0];

// Asignar el HTML generado a la estructura con la clase "lista-productos"
listaProductos.innerHTML = listaHtml;

/////////ENTREGA Nª3 CONSIGNA-1/////////

// Almacenar en el localStorage el identificador de un producto
  function guardarIdProducto(id) {
    localStorage.setItem('ID_del_producto', id);
  }

  const productosDivs = document.querySelectorAll('.producto');

  productosDivs.forEach((productoDiv) => {
    productoDiv.addEventListener('click', () => {
      // Acá almaceno en una constante el id del producto
      const dataId = productoDiv.getAttribute('data-id');

      // Llamar a la función para guardar el ID en localStorage
      guardarIdProducto(dataId);
      // Luego, redirige al usuario a product-info.html
      window.location.href = 'product-info.html';
    });
  });
}

// funciones para ordenar ascendente
function ordenAscendente(data) {
  data.products.sort((a, b) => a.cost - b.cost);
}

// función para ordenar el precio de forma descendente.
function ordenDescendente(data) {
  data.products.sort((a, b) => b.cost - a.cost);
}

// Función para filtrar los productos por su relevancia:
function sortRelevancia(data) {
  data.products.sort((a, b) => b.soldCount - a.soldCount);
}

// Función para filtrar el precio de los productos
function filtrar(data) {
  const precioMin = parseFloat(precioMinInput.value);
  const precioMax = parseFloat(precioMaxInput.value);

  filteredProducts = data.products.filter(
    (item) => item.cost >= precioMin && item.cost <= precioMax
  );

  console.log(filteredProducts);

  // Luego de filtrar, mostrar los productos filtrados
  mostrarProductos({ products: filteredProducts });
}

// Función para limpiar el contenido de los rangos
function clearInputs() {
  precioMaxInput.value = "";
  precioMinInput.value = "";
}

function filtrarbusqueda(data) {
  let searchTextProducto = searchInputProducto.value.toLowerCase();

  let filteredProductsBusqueda = data.products.filter(item => {
    const nombreLowerCase = item.name.toLowerCase(); /*para búsqueda por nombre*/
    const descripcionLowerCase = item.description.toLowerCase(); /*para búsqueda por descripción*/
    return nombreLowerCase.includes(searchTextProducto) || descripcionLowerCase.includes(searchTextProducto);
  });
  mostrarProductos({ products: filteredProductsBusqueda });
  // if (filteredProductsBusqueda.length === 0) {
  //   searchResultsProducto.innerHTML = '<p>No se encontraron resultados</p>';
  // } else {


}

// Esperar hasta que el contenido del DOM (estructura HTML) esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Código para obtener la categoría de cada producto en función de la que se elija
  const catID = localStorage.getItem("catID");
  const productsData = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  // Realizar una solicitud a la URL proporcionada usando el método fetch
  fetch(productsData)
    // Cuando la respuesta de la solicitud se recibe, la convertimos a formato JSON
    .then((response) => response.json())
    // Después de convertir la respuesta a JSON, llamamos a la función mostrarProductos con los datos
    .then((data) => {
      // Mostrar productos por defecto al cargar la página
      mostrarProductos(data);

      // Agregar eventos de clic para los botones de filtro y ordenamiento
      botonAsc.addEventListener("click", () => {
        ordenAscendente(data);
        mostrarProductos(data);
      });

      botonDesc.addEventListener("click", () => {
        ordenDescendente(data);
        mostrarProductos(data);
      });

      botonRelevancia.addEventListener("click", () => {
        sortRelevancia(data);
        mostrarProductos(data);
      });

      botonFiltrar.addEventListener("click", () => {
        filtrar(data);
      });

      limpiarFiltros.addEventListener("click", () => {
        clearInputs();
        mostrarProductos(data)
      });
      searchInputProducto.addEventListener('input', () => {
        filtrarbusqueda(data);
      });

    })
    // En caso de error en la solicitud o en el manejo de datos, mostrar un mensaje de error en la consola
    .catch((error) => {
      console.error("Error en la solicitud fetch:", error);
    })
});
