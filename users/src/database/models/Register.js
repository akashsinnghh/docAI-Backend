const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserRegisterSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    phone: { type: String },
    token: { type: String},
    salt: { type: String},
});

module.exports =  mongoose.model('UserRegisterSchema', UserRegisterSchema);