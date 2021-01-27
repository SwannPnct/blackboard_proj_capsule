var express = require('express');
const { model } = require('mongoose');
var router = express.Router();

const models = require('./db/models');
const UserModel = require('./db/user_model');



/* GET home page. */
router.get('/', async function(req, res, next) {

  const unavailable = await models.ArticleModel.find({stock: 0});

  const admin = await UserModel.findById("5c52e4efaa4beef85aad5e52");
  const messages = admin.messages.filter(mess => !mess.read);
  
  
  const tasks = admin.tasks.filter(task => !task.dateCloture);

  res.render('index', {
    countProd: unavailable.length,
    nonReadCount: messages.length,
    unclosedCount: tasks.length
  });
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  const admin = await UserModel.findById('5c52e4efaa4beef85aad5e52');
  const tasks = admin.tasks; 
  res.render('tasks',{tasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  const admin = await UserModel.findById('5c52e4efaa4beef85aad5e52');
  const messages = admin.messages;
  res.render('messages',{messages});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  const customers = await UserModel.find({status: "customer"});
  res.render('users', {customers});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {

  const catalog = await models.ArticleModel.find();

  res.render('catalog', {catalog});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {

  const orderList = await models.OrderModel.find();

  res.render('orders-list', {orderList});
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {

  const order = await models.OrderModel.findById(req.query.orderId).populate('articles').exec();

  res.render('order', {order});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {

  const aggrGender = await UserModel.aggregate().group({
    _id : "$gender", userCount: {$sum : 1}
  }).exec();

  const messagesCount = {
    read: null,
    nonRead: null
  }
  const admin = await UserModel.findById("5c52e4efaa4beef85aad5e52");
  const nonReadMessages = admin.messages.filter(mess => !mess.read).length;
  messagesCount.nonRead = nonReadMessages;
  messagesCount.read = admin.messages.length - nonReadMessages;

  const ordersStatus = {
    shipped: null,
    nonShipped : null
  }
  const orders = await models.OrderModel.find();
  for (let i = 0 ; i < orders.length;i++) {
    if (orders[i].status_payment == "validated" && orders[i].status_shipment) {
      ordersStatus.shipped++;
    } else if (orders[i].status_payment == "validated" && !orders[i].status_shipment) {
      ordersStatus.nonShipped++;
    }
  }

  //step 6 ( bonus)
  const aggrOrders = await models.OrderModel
  .aggregate()
  .match({"status_payment": "validated"})
  .group({
    _id: {
      year_payment: {$year: "$date_payment"},
      month_payment: {$month: "$date_payment"},
    },
    totalSum: {$sum: "$total"}
  });

  aggrOrders.sort((a,b) => {
    return a._id.month_payment - b._id.month_payment;
  })
  aggrOrders.sort((a,b) => {
    return a._id.year_payment - b._id.year_payment;
  })

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let j = 0; j < aggrOrders.length; j++) {
    aggrOrders[j]._id.month_payment = months[aggrOrders[j]._id.month_payment -1];
  }

  console.log(aggrOrders);

  res.render('charts', {aggrGender, messagesCount,ordersStatus, aggrOrders});
});



module.exports = router;
