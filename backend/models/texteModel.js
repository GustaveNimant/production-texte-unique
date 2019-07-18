const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const texteSchema = new Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    shasum: { type: String, required: true },
    participantId: { type: String, required: true },
    noteMoyenne: { type: Number, required: true }
},{
    collection : 'texte_c'
});

module.exports = mongoose.model('texteModel', texteSchema);
