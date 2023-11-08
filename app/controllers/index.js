function showProducts(selection) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/products');
    xhr.send();
    console.log("Showing products " + selection);
    let item = '';
    item += "<div class=\"container\"><div class=\"row\">";
    let cards = document.getElementById('tarjetas');
    console.log("Showing products " + selection);
    xhr.onload = function () {
        let list = JSON.parse(xhr.response);
        console.log(list);
        let numberofProducts = Object.keys(list.products).length;
        console.log("Number of products: " + numberofProducts);
        let FourPerPage = Math.ceil(numberofProducts / 4);
        console.log("Number of pages: " + FourPerPage);
        if (selection == 1) {
            for (let i = 0; i < 4 && i < numberofProducts; i++) {
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                    <button type="button" class="btn btn-primary buy-now-btn" 
                        style="font-family: fantasy; background-color: white; border-color: #ff903d; color: #ff903d;"
                        data-bs-toggle="modal" data-bs-target="#bnModal">
                        Buy Now
                    </button>
                    </div>
                </div> </div>`;
            }
        } else if (selection == 2) {
            for (let i = 4; i < 8 && i < numberofProducts; i++) {
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                    <button type="button" class="btn btn-primary buy-now-btn" 
                        style="font-family: fantasy; background-color: white; border-color: #ff903d; color: #ff903d;"
                        data-bs-toggle="modal" data-bs-target="#bnModal">
                        Buy Now
                    </button>
                    </div>
                </div> </div>`;
            }
        } else if (selection == 3) {
            for (let i = 8; i < 12 && i < numberofProducts; i++) {
                item += `
                <div class="col-lg-3 col-md-4 col-6">
                <div id = "card" class="card mb-4">
                    <img id = "card-img" class="card-img-top" src=${Object.values(list.products)[i].imageUrl} alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">${Object.values(list.products)[i].title}</h5>
                        <p class="card-text">${Object.values(list.products)[i].description}</p>
                    </div>
                    <div>
                    <button type="button" class="btn btn-primary buy-now-btn" 
                        style="font-family: fantasy; background-color: white; border-color: #ff903d; color: #ff903d;"
                        data-bs-toggle="modal" data-bs-target="#bnModal">
                        Buy Now
                    </button>
                    </div>
                </div> </div>`;
            }
        }
        item += "</div></div>";
        cards.innerHTML = item;
    };
}


