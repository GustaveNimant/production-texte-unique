const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const notationSchema = new Schema({
    texteId: { type: String},
    participantId: { type: String},
    note: { type: Number},
    date: { type: String}, /* créée par Service */
},{
    collection : 'notation_c'			    
});

notationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('notationMongooseModel', notationSchema);
