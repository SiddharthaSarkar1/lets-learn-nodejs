const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema Mongoose
const productSchema = new Schema({
    title: { type: String, required: true, unique: true }, // String is shorthand for {type: String}
    description: { type: String },
    price: { type: Number, min: [0, 'wrong price'] }, // Number is shorthand for {type: Number}
    discountPercentage: { type: Number, min: [0, 'wrong min discount'], max: [50, 'wrong max discount'] },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max rating'] },
    brand: String,
    category: String,
    thumbnail: String,
    images: [ String ], //Array of String
});
// Model Mongoose
exports.Product = mongoose.model('Product', productSchema); //Collection will be saved as Products