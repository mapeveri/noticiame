const Notice = require('../models/notice');

// Routes
module.exports = (app) => {
  // Index route
  app.get('/', async (req, res) => {
    const notices = await Notice.find({});

    res.render('home', {
      notices,
    });
  });
}
