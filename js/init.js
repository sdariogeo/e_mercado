const CATEGORIES_URL = "https://localhost:3000/cats";
const PUBLISH_PRODUCT_URL = "https://localhost:3000/sell/publish.json";
const PRODUCTS_URL = "https://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "https://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://localhost:3000/products_comments/";
const CART_INFO_URL = "https://localhost:3000/user_cart/";
const CART_BUY_URL = "https://localhost:3000/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const search_btn = document.getElementById("searchButton");
const close_btn = document.getElementById("botoncerrar");
const search_box_wrap = document.getElementById("div-wrap");
const input_search = document.getElementById("searchInput");

search_btn.addEventListener("click", function(){
	search_box_wrap.classList.add("active");
	input_search.focus();
});

close_btn.addEventListener("click", function(){
	search_box_wrap.classList.remove("active");
});


/*  */


