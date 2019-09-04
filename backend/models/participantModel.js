const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const participantSchema = new Schema({
    email: { type: String, required: true, unique: true },
    pseudo: { type: String, required: true, unique: true },
    cle_publique: { type: String, unique: true }
},{
    collection : 'participant_c'			    
});

participantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participantModel', participantSchema);
