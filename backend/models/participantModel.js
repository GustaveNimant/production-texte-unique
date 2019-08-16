const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const participantSchema = new Schema({
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    cle_publique: { type: String},
    connexionId: { type: Number }
},{
    collection : 'participant_c'			    
});

participantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('participantModel', participantSchema);
