function showProducts(selection){
    let xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/products');
    xhr.send();
    console.log("Showing products " + selection);
    let item = '';
    item += "<div class=\"container\"><div class=\"row\">";
    let cards = document.getElementById('tarjetas');
    console.log("Showing products " + selection);
    xhr.onload = function(){
        let list = JSON.parse(xhr.response);
        console.log(list);
        let numberofProducts = Object.keys(list.products).length;
        console.log("Number of products: " + numberofProducts);
        let FourPerPage = Math.ceil(numberofProducts/4);
        console.log("Number of pages: " + FourPerPage);
        if(selection == 1){
            for(let i = 0; i < 4 && i< numberofProducts; i++){
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                        <button id = "boton-carrito" href="#"  data-bs-toggle="modal" data-bs-target="#cartModal" class="btn" type="submit" onclick = "agregarAlCarrito('${Object.values(list.products)[i].uuid}', '${Object.values(list.products)[i].imageUrl}', '${Object.values(list.products)[i].title}', '${Object.values(list.products)[i].pricePerUnit}')">Agregar al carrito</button>
                    </div>
                </div> </div>`;    
            }
        }else if(selection == 2){
            for(let i = 4; i < 8 && i< numberofProducts; i++){
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                        <button id = "boton-carrito" href="#"  data-bs-toggle="modal" data-bs-target="#cartModal" class="btn" type="submit">Agregar al carrito</button>
                    </div>
                </div> </div>`;      
            }
        }else if(selection == 3){
            for(let i = 8; i < 12 && i< numberofProducts; i++){
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                        <button id = "boton-carrito" href="#"  data-bs-toggle="modal" data-bs-target="#cartModal" class="btn" type="submit">Agregar al carrito</button>
                    </div>
                </div> </div>`;    
            }

        }
        item += "</div></div>";	
        cards.innerHTML = item;
        
    }
}

function inicializarCarrito() {
    if (sessionStorage.getItem('carrito') === null) {
      let carrito = [];
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }
  function obtenerCarrito() {
    let carritoJSON = sessionStorage.getItem('carrito');
    let carrito = JSON.parse(carritoJSON);
    return carrito || [];
}
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(id, imagen, titulo, precio) {
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("titulo", titulo)
    sessionStorage.setItem("imagen", imagen)
    sessionStorage.setItem("precio", precio)

    let carrito = obtenerCarrito();
    sessionStorage.setItem("carrito",JSON.stringify(carrito));
    console.log(sessionStorage);
  }

let agregarBtn = document.getElementById('agregarBtn');

agregarBtn.addEventListener('click', function () {

  let cantidadInput = document.getElementById('cantidad');
  let cantidad = cantidadInput.value;
  if(cantidad>0){
    let carrito = obtenerCarrito();
    
    let id = sessionStorage.getItem("id");
    let titulo = sessionStorage.getItem("titulo");
    let imagen = sessionStorage.getItem("imagen");
    let precio = sessionStorage.getItem("precio");
    let producto = {"id":id,"titulo":titulo,"imagen":imagen,"precio":precio,"cantidad":cantidad};

    carrito.push(producto);
    sessionStorage.setItem("carrito",JSON.stringify(carrito));
  }
    
});

function showShoppingCart(){
    window.location.href = './P01_cart.html'
}

  