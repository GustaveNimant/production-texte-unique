const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const connexionSchema = new Schema({
//    email: { type: String, required: true, unique: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
},{
    collection : 'connexion_c'			    
});

connexionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('connexionModel', connexionSchema);
