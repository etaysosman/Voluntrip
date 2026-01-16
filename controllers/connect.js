const connect = require('../models/connect');


exports.getConnect = (req, res) => {
  res.render('connect');
};

exports.postConnect = (req, res) => {
  const volunteeredBefore = req.body.volunteeredBefore ? 1 : 0;

  const suggestion = new Connect(
    req.body.orgName,
    req.body.contactPhone,
    req.body.socialLink || null,
    req.body.category,
    volunteeredBefore,
    req.body.details || null
  );

  suggestion.save()
    .then(() => {
      res.redirect('/connect');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
};
