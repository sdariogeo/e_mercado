/*ENTREGA Nª3 / CONSIGNA-2*/
document.addEventListener("DOMContentLoaded", function () {
  const productId = localStorage.getItem("ID_del_producto");
  
  if (productId) {
    // Realizar la solicitud para obtener los detalles del producto
    fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`)
      .then((response) => response.json())
      .then((product) => {
        // Construir el HTML para mostrar los detalles del producto
        const detalleProductoHTML = `
          <h1>${product.name}</h1>
          <p><span class="autos-negrita">Decripción:</span> ${product.description}</p>
          <p><span class="autos-negrita">Precio:</span> ${product.currency} ${product.cost}</p>
          <p><span class="autos-negrita">Vendidos:</span> ${product.soldCount}</p>
          `;

        // Mostrar los detalles del producto en la página
        const detalleProductoContainer =
          document.getElementById("detalle-producto");
        detalleProductoContainer.innerHTML = detalleProductoHTML;

        // hacemos un bucle for-of para poder iterar el array de las imágenes correctamente
      // Selecciona el contenedor del carrusel
const carruselContainer = document.querySelector('.carousel-inner');

// Variable para rastrear el índice del elemento activo
let indiceActivo = 0;
        for (const image of product.images) {
          const carruselItem = document.createElement('div');
          carruselItem.classList.add('carousel-item');
        
          if (indiceActivo === 0) {
            carruselItem.classList.add('active'); // La primera imagen debe ser activa
          }
        
          const img = document.createElement('img');
          img.src = image;
          img.alt = product.name;
          img.classList.add('d-block', 'w-80', 'm-auto'); // Clases de Bootstrap para la imagen
        
          carruselItem.appendChild(img);
          carruselContainer.appendChild(carruselItem);
        
          indiceActivo++; // Incrementa el índice activo para la siguiente imagen
        }
        /*ENTREGA Nª3 / CONSIGNA-3*/
        //crear los comentarios de los productos

        function showComment(comment) {
          const comentarioHTML = `
    <div class="container-comentarios">
        <div>
          <div>
            <div class="comentarios-usuario">
              <div>
              <p class="nombre-usuario">${comment.user.toUpperCase()}</p>
              </div>
              <div>
              <p>${new Date(comment.dateTime).toLocaleString()}</p> 
              </div>
            </div>
            <span class="fa fa-star ${comment.score >= 1 && "checked"
            }"></span>
            <span class="fa fa-star ${comment.score >= 2 && "checked"
            }"></span>
            <span class="fa fa-star ${comment.score >= 3 && "checked"
            }"></span>
            <span class="fa fa-star ${comment.score >= 4 && "checked"
            }"></span>
            <span class="fa fa-star ${comment.score >= 5 && "checked"
            }"></span>
          </div>
          <div>
            <p>${comment.description}</p>
          </div>
        </div
    </div>`;

          const comentarios = document.getElementById("comentario-producto");
        

          comentarios.innerHTML += comentarioHTML;
       
        };

        //realizo la solicitud fetch
        fetch(`https://japceibal.github.io/emercado-api/products_comments/${productId}.json`)
          .then((response) => response.json())
          .then((comments) => {
            console.log(comments);

            for (const comment of comments) {
              showComment(comment);
            };
            
            const buttonComment = document.getElementById('agregar');
            
            buttonComment.addEventListener('click', () => {
              
              let newScore = document.getElementById("commentScore").value;
              let newComment = document.getElementById('commentId').value;
              let userComment = { description: newComment, user:localStorage.getItem('email'), dateTime: new Date(), score: newScore };
          
            
              function addComment() {

               if (document.getElementById("commentScore").value === "elegir" || document.getElementById('commentId').value == "" ){
                alert("Debes ingresar un comentario y una calificación");
                
               }else {
                document.getElementById("commentScore").value = "elegir";
                document.getElementById('commentId').value = "";
                showComment(userComment);
               }
          
              } 

              addComment();
             
            })
            
          });
      });
  }
});
