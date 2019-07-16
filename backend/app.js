const express = require('express');
const app = express();

app.use('/api/les-textes', (req, res, next) => {

  const des_textes = [
    {
      _id: 'oeihfzeoi',
      titre: 'La première version',
      content: 'Sur le plan institutionnel : introduire la possibilité d’intervention directe du peuple dans la démocratie via le Référendum d’Initiative Citoyenne (RIC) en toutes matières.',
      shasum: '23fc8dcaed0ef2a758555d2117c5534e002e1f54',
      noteMoyenne: 8.5,
      participantId: 'qsomjhvqios',
    },

    {
      _id: 'oeihfzeomoihi',
      titre: 'La deuxième version',
      content: 'Changer les institutions en introduisant la possibilité d’intervention directe du peuple dans la démocratie via le Référendum d’Initiative Citoyenne (RIC) en toutes matières.',
      shasum: 'e1a398ff436d13a07d267465605856096b6d8259',
      noteMoyenne: 7.2,
      participantId: 'rtpniiwrjpt',
    },

  ];

  res.status(200).json(des_textes);
});

module.exports = app;
