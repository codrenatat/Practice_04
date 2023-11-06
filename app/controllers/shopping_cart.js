class ShoppingCartException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class ProductProxy{
    constructor(uuid, amount){
        this.uuid = uuid;
        this.amount = amount;
    }
}

class ShoppingCart{
    //Arreglo en donde product es copia del arreglo dado
    constructor(products){
        this.product  = products;
        this.proxies  = [];
    }

    addItem(productUuid, amount){
        //Busca el índice del producto por medio del uuid.
        let existingProxy = this.proxies.findIndex(proxy => proxy.uuid === productUuid);
        //Revisa si el elemento existe para simplemente aumentar el "amount"
        if (existingProxy != -1){
            this.proxies[existingProxy].amount += amount;
        }
        //Si no existe, crea un nuevo ProductProxy
        else{
            let newProxy = new ProductProxy(productUuid, amount);
            this.proxies.push(newProxy);
        }
    }
    
    updateItem(productUuid, newAmount){
        //Busca el índice del producto por medio del uuid.
        let existingProxy = this.proxies.findIndex(proxy => proxy.uuid === productUuid);
        //Si el amount dado es mayor a 0, intercambia el valor
        if (newAmount > 0){
            this.proxies[existingProxy].amount = newAmount; 
        }
        //Si el amount dado es igual a 0, elimina el producto con la función removeItem
        else if(newAmount === 0){
            this.removeItem(productUuid);
        }
        //Lanza un error ya que el amount dado es inválido
        else {
            throw new ShoppingCartException("New amount cannot be negative");
        }
    }

    removeItem(productUuid){
        //Busca el índice del producto por medio del uuid.
        let existingProxy = this.proxies.findIndex(proxy => proxy.uuid === productUuid);
        this.proxies.splice(existingProxy,1);
    }

    calculateTotal(){
        let total = 0;
        //Recorre cada producto del arreglo proxies
        for (let key of this.proxies){
            //Busca el producto por el uuid para poder tener su costo
            let product = getProductById(key.uuid);
            total += key.amount * product.pricePerUnit;
        }
        return total;
    }
}


function showShoppingCart(){
    let cart = JSON.parse(sessionStorage.getItem("carrito"));
    let elements = ''
            for(let product of cart){
                elements += `
                <div id = "large-media" class="media border p-3">
                    <img id = "media-mini" src=${product.imagen} alt="Imagen" class="mr-3">
                    <div class="media-body input-width">
                        <h4 class="mt-0 mb-1">${product.titulo} &nbsp;<button type = "button" class="btn btn-danger"><i class="fa-solid fa-trash "></i></button></h4><br>
                        <div class="input-group mb-3" >
                            <span class="input-group-text">Cantidad:</span> 
                            <input type="text" class="form-control" id="Cantidad" value = "${product.cantidad}" style = "background-color: #f5f5f5;" disabled>
                            <button type = "button" class="btn" style="background-color:#53a9f9"><i class="fa-solid fa-pencil" style="color: #ffffff;"></i></button>   
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text custom-width">Precio:</span>
                            <input type="text" class="form-control" id="Precio" value = "${product.precio * product.cantidad}"> 
                            <span class="input-group-text">MXN</span>
                        </div>
                    </div>
                </div><br>`;    
            }
        document.getElementById('shopping').innerHTML = elements;
        
}

function calculateShoppingCart(){
    let cart = JSON.parse(sessionStorage.getItem("carrito"));
    let elements = '';
    elements += `<h4 class="mt-0">Total de compra:</h4>`;
    let total;

    for(let product of cart){
        elements += `<p><b>${product.titulo}:</b> ${product.cantidad} x ${product.precio} MXN</p>`
        total = product.precio * product.cantidad;
    }
    elements += `<h4><b>Monto a pagar:  </b> ${total} MXN</h1>`
    document.getElementById('total').innerHTML = elements;

}
showShoppingCart();
calculateShoppingCart();
//module.exports = ShoppingCart;
