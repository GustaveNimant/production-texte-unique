const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const participantSchema = new Schema({
//    email: { type: String, required: true, unique: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
},{
    collection : 'participant_c'			    
});

participantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participantModel', participantSchema);
