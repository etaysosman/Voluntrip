const Connect = require('../models/connect');

exports.getConnect = (req, res) => {
  Connect.fetchLatest()
    .then(([rows]) => {
      res.render('connect', {
        suggestions: rows
      });
    })
    .catch(err => {
      console.log(err);
      res.render('connect', {
        suggestions: []
      });
    });
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
      console.log("Suggestion Sent")
      res.redirect('/connect');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Server error');
    });
};
