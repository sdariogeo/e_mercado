const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});

function sortAndShowCategories(sortCriteria){
    
    ordenado = sortProducts(sortCriteria, productsArray.products);

    showProductsList(ordenado);
}

/* ----------INICIO CODIGO BARRA BUSQUEDA------------- */

/* EN DESARROLLO
const searchInputCategoria = document.getElementById('search-input-categoria');
const searchResultsCategoria = document.getElementById('search-results-categoria');

searchInputCategoria.addEventListener('input', () => {
  let searchTextCategoria = searchInputCategoria.value.toLowerCase();
  
  fetch("https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json")
    .then(response => response.json())
    .then(data => {
      let filteredProducts = data.products.filter(product => product.name.toLowerCase().includes(searchTextCategoria));

      if (filteredProducts.length === 0) {
        searchResultsCategoria.innerHTML = '<p>No se encontraron resultados</p>';
      } else {
        showProductsList(filteredProducts);
      }
    })
    .catch(error => {
      console.error('Error al obtener los productos:', error);
    });
});

function showProductsList(productsArray) {
  searchResultsCategoria.innerHTML = ''; // Limpiar contenido previo
  
  productsArray.forEach(product => {
    const productDiv = document.createElement('div');
    
    const productHTML = `
      <div class="producto">
        <img class="imagenCars" src=${product.image}>
        <div class="divTexto">
          <div class="divNombre">
            <p class="nombre">${product.name}</p>
          </div>
          <div class="divDescripcion">
            <p class="descripcion">${product.description}</p>
          </div>
          <div class="divPrecio">
            <p class="precio">Precio: ${product.currency} ${product.cost}</p>
          </div>
          <div class="divVendidos">
            <p class="vendidos">Vendidos: ${product.soldCount}</p>
          </div>
        </div>
      </div>
      <hr>
    `;
    
    productDiv.innerHTML = productHTML;
    searchResultsCategoria.appendChild(productDiv);
  });
}


const productsArray = "https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem("catID")+".json";

searchInputProducto.addEventListener('input', () => {
  let searchTextProducto = searchInputProducto.value.toLowerCase();

  let filteredProducts = productsArray.products.filter(product => product.name.toLowerCase().includes(searchTextProducto));

  if (filteredProducts.length === 0) {
      searchResultsProducto.innerHTML = '';
      searchResultsProducto.innerHTML = '<p>No se encontraron resultados</p>'; 
  } else {
    showProductsList(filteredProducts);
  }
}); */