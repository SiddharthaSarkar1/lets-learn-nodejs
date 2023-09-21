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

server.use(express.static('public'));

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

//API - Endpoint
server.get('/', auth, (req, res) => {
    console.log(req.params);
    res.json({type: 'GET'});
})
//adding dynamic parameters
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

// server.get('/', (req, res) => {
//     res.sendStatus(404);
//     res.json(products);
//     res.sendStatus(201).send("hello");
//     To use send file method we have to give absolute path
//     res.sendFile('E:/My Documents2/Node JS University 2023/Coder Dost/learn-nodejs/index.html');
// })

server.listen(8800, () => {
    console.log("Server Started!!!!");
});