const fs = require("fs");
const model = require("../model/product");
const { query } = require("express");
const Product = model.Product;
// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

//MVC model-view-controller
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const output = await product.save();
    console.log(output);
    return res
      .status(200)
      .json({ Message: "Successfully added a new product." });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }

  //res.json({Message: 'Successfully added a new product.'});
};

// get all products using id  url http://localhost:8800/products/
exports.getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find();
    // Sorting products in ascending order
    let products = Product.find();
    // const sortedProductsAse = await products.sort({ price: 1 }).exec();
    const sortedProductsDesc = await products.sort({ price: -1 }).exec();
    // res.status(200).json(products);
    // res.status(200).json(sortedProductsAse);
    res.status(200).json(sortedProductsDesc);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// get one product using id  url http://localhost:8800/products/656b6a4846b14882dafbdd54
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// PUT request to replace http://localhost:8800/products/656b7395b64ac5b716eb1027
exports.replaceProduct = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await Product.findOneAndReplace({ _id: id }, req.body, {new: true});
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// PATCH request to update (not replace) a product
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await Product.findOneAndUpdate({ _id: id }, req.body, {new: true});
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id; 
        const result = await Product.findOneAndDelete({ _id: id });
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
