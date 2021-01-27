const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description : String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String,
})

const ArticleModel = mongoose.model('article', articleSchema);

const orderSchema = new mongoose.Schema({
    articles: [{type: mongoose.Schema.Types.ObjectId,ref: 'article'}],
    total: Number,
    shipping_cost: Number,
    date_insert: Date,
    status_payment: String,
    date_payment: Date,
    status_shipment: Boolean,
    date_shipment: Date,
    delivery_address: String,
    delivery_city: String,
    delivery_zipcode: String,
})

const OrderModel = mongoose.model('order', orderSchema);

module.exports = {
    ArticleModel,
    OrderModel,
    
}