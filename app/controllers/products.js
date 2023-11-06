const UUID = require('./utils');

class ProductException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Product{
    constructor(title, description, imageUrl, unit, stock, pricePerUnit, category){
        this._uuid = UUID.generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category;
    }
    
    //Setter y Getter de UUID
    set uuid(uuid){
        throw new ProductException("Product uuids are auto-generated.");
    }
    get uuid(){
        return this._uuid;
    }

    //Setter y Getter de title
    set title(title){
        if(typeof title === 'string' && title.trim() !== ''){
            this._title = title;
        } else{
            throw new ProductException("Title has to be string and not empty.");
        }
    }
    get title(){
        return this._title;
    }

    //Setter y Getter de description
    set description(description){
        if(typeof description === 'string' && description.trim() !== ''){
            this._description = description;
        } else{
            throw new ProductException("Description has to be string and not empty.");
        }
    }
    get description(){
        return this._description;
    }

    //Setter y Getter de imageUrl
    set imageUrl(imageUrl){
        if(typeof imageUrl === 'string' && imageUrl.trim() !== ''){
            this._imageUrl = imageUrl;
        } else{
            throw new ProductException("Image URL is not valid.");
        }
    }
    get imageUrl(){
        return this._imageUrl;
    }

    //Setter y Getter de unit
    set unit(unit){
        if (typeof unit === 'string' && unit.trim() !== ''){
            this._unit = unit;
        }
        else{
            throw new ProductException("Unithas to be string and not empty.");
        }
    }
    get unit(){
        return this._unit;
    }

    //Setter y Getter de stock
    set stock(stock){
        if (stock < 0 || stock % 1 !== 0){
            throw new ProductException("Stock has to be integer and positive.");
        }
        else{
            this._stock = stock;
        }
    }
    get stock(){
        return this._stock;
    }

    //Setter y Getter de pricePerUnit
    set pricePerUnit(pricePerUnit){
        if (pricePerUnit <= 0){
            throw new ProductException("Price per unit has to be positive.");
        }
        else{
            this._pricePerUnit = pricePerUnit;
        }
    }
    get pricePerUnit(){
        return this._pricePerUnit;
    }

    //Setter y Getter de category
    set category(category){
        if(typeof category === 'string' && category.trim() !== ''){
            this._category = category;
        } else{
            throw new ProductException("Category has to be string and not empty.");
        }
    }
    get category(){
        return this._category;
    }
    
    static createFromJson(stringProduct){
        try {
            let producto = JSON.parse(stringProduct);
            return new Product(
                producto.title,
                producto.description,
                producto.imageUrl,
                producto.unit,
                producto.stock,
                producto.pricePerUnit,
                producto.category
            );
        } 
        catch (error) {
            throw new ProductException("Error converting JSON to a Product Instance.");
        }
    }

    static createFromObject(obj) {
        let cleanObj = Product.cleanObject(obj);
        return new Product(
            cleanObj['title'],
            cleanObj['description'],
            cleanObj['imageUrl'],
            cleanObj['unit'],
            cleanObj['stock'],
            cleanObj['pricePerUnit'],
            cleanObj['category']
        );
    }

    static cleanObject(obj) {
        let validAttributes = [
            'title',
            'description',
            'imageUrl',
            'unit',
            'stock',
            'pricePerUnit',
            'category',
        ];

        let cleanedObj = {};
        for (let key of validAttributes){
            if (obj.hasOwnProperty(key)){
                cleanedObj[key] = obj[key];
            }
        }
        return cleanedObj;
    }
}

module.exports = Product;