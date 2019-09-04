const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const notationSchema = new Schema({
    note: { type: number },
    date: { type: string },
    texteId: { type: String, required: true},
    participantId: { type: String, unique: true }
},{
    collection : 'notation_c'			    
});

notationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('notationModel', notationSchema);
