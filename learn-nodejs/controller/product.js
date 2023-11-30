const fs = require('fs');
// const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

//MVC model-view-controller
exports.createProduct = (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
    //res.json({Message: 'Successfully added a new product.'});
}

exports.getAllProducts = (req, res) => {
    res.status(200).json(products);
}

exports.getProduct = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const product = products.find((product) => product.id == id )
    res.status(200).json(product);
}

exports.replaceProduct = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    products.splice(productIndex, 1, {...req.body, id: id});
    res.status(201).json({ Message: "Product is updated successfully."});
}

exports.updateProduct = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...req.body});
    res.status(201).json({ Message: `Product at index ${productIndex + 1} is updated successfully.`});
}

exports.deleteProduct = (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.status(200).json(product);
}