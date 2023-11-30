const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const products = data.products;

const server = express();

//MIDDLEWARE

//BodyParser
server.use(express.json());
server.use(express.urlencoded());

server.use(morgan("default"));

// server.use(express.static('public'));

//This as an application level middleware and this is applicable for everything
// server.use((req, res, next) => {
//     console.log(req.method, req.ip, req.hostname, new Date(), req.get('User-Agent'))
//     next();
// })

//Route level middleware
const auth = (req, res, next) => {
    // console.log(req.query);
    if(req.body.password == '123') {
        next();
    }else {
        res.sendStatus(401);
    }
}

// server.use(auth);

// API - Endpoint
server.get('/', auth, (req, res) => {
    console.log(req.params);
    res.json({type: 'GET'});
})
// adding dynamic parameters
server.get('/product/:id', (req, res) => {
    console.log(req.params);
    res.json({type: 'GET'});
})

server.post('/', auth, (req, res) => {
    res.json({type: 'POST'});
})

server.put('/', (req, res) => {
    res.json({type: 'PUT'});
})

server.delete('/', (req, res) => {
    res.json({type: 'DELETE'});
})

server.patch('/', (req, res) => {
    res.json({type: 'PATCH'});
})

server.get('/test', (req, res) => {
    //.res.sendStatus(404);
    // res.json(products);
    // res.sendStatus(201).send("hello");
    //To use send file method we have to give absolute path
    // res.sendFile('E:/My Documents2/Node JS University 2023/Coder Dost/learn-nodejs/index.html');
})

//Start API using REST API standard [ C R U D ] ===========================================

// Create POST /products
server.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
    //res.json({Message: 'Successfully added a new product.'});
})


//Read GET /products
//This will return all the products
server.get("/products", (req, res) => {
    res.status(200).json(products);
});

//Read GET /products/:id
//This will return all the product
server.get("/products/:id", (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const product = products.find((product) => product.id == id )
    res.status(200).json(product);
});

//Update PUT /products/:id
server.put("/products/:id", (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    products.splice(productIndex, 1, {...req.body, id: id});
    res.status(201).json({ Message: "Product is updated successfully."});
});

//Update PATCH /products/:id
server.patch("/products/:id", (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...req.body});
    res.status(201).json({ Message: `Product at index ${productIndex + 1} is updated successfully.`});
});

//Delete DELETE /products/:id
server.delete("/products/:id", (req, res) => {
    const id = +req.params.id; //Converting the string id to numeric id
    const productIndex = products.findIndex((product) => product.id === id );
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.status(200).json(product);
});

// End API using REST API standard [ C R U D ] ===========================================


//Listening Port

server.listen(8800, () => {
    console.log("Server Started!!!!");
});