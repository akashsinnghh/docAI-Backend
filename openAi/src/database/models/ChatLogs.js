const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const symptomSchema = new mongoose.Schema({
    severity: {
        type: String,
        enum: ['Mild', 'Moderate', 'Severe'],
        required: true,
    },
    notes: {
        type: String,
        default: '',
    },
});

const Chat_Logs = new Schema({
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    selectedSymptoms: {
        type: Map,
        of: symptomSchema, 
        default: {},
    },
    otherSymptoms: {
        type: String,
        default: 'no',
    },
    userData: {
        type: Map,
        of: symptomSchema, 
        default: {},
    },
}, {
    timestamps: true,

});

module.exports =  mongoose.model('Chat_Logs', Chat_Logs);