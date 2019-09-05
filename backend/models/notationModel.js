const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const notationSchema = new Schema({
    texteId: { type: String, required: true},
    participantId: { type: String, unique: true }
    note: { type: number, required:true },
    date: { type: string, required:true },
},{
    collection : 'notation_c'			    
});

notationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('notationModel', notationSchema);
