const express = require("express");
const morgan = require("morgan");
// Mongoose Require
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const server = express();
//DB connection code
//Mongoose Connect
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_sid");
  console.log("Database Connected!");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




//MIDDLEWARE
//BodyParser
server.use((req, res, next) => {
  const token = req.get('Authorization').split('Bearer ')[1];
  // const token = req.get('Authorization');
  console.log(token);
  var decoded = jwt.verify(token, 'Shhhh');
  console.log(decoded);
  if(decoded.email) {
    next();
  } else {
    res.sendStatus(401);
  }
});


server.use(express.json());
// server.use(express.urlencoded());
server.use(morgan("default"));
server.use(express.static("public"));

server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

//This as an application level middleware and this is applicable for everything
// server.use((req, res, next) => {
//     console.log(req.method, req.ip, req.hostname, new Date(), req.get('User-Agent'))
//     next();
// })

//Route level middleware
const auth = (req, res, next) => {
  // console.log(req.query);
  if (req.body.password == "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

// server.use(auth);

// API - Endpoint
server.get("/", auth, (req, res) => {
  console.log(req.params);
  res.json({ type: "GET" });
});
// adding dynamic parameters
server.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.json({ type: "GET" });
});

server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});

server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

// server.get('/test', (req, res) => {
//     //.res.sendStatus(404);
//     // res.json(products);
//     // res.sendStatus(201).send("hello");
//     //To use send file method we have to give absolute path
//     // res.sendFile('E:/My Documents2/Node JS University 2023/Coder Dost/learn-nodejs/index.html');
// })

//Listening Port
server.listen(8800, () => {
  console.log("Server Started!!!!");
});
