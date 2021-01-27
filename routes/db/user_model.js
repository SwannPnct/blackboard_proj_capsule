const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    title: String,
    content: String,
    dateExp : Date,
    read: Boolean,
    sender: String
})

const taskSchema = new mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date
})

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [messageSchema],
    tasks: [taskSchema]

})

const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel;