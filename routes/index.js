const Notice = require('../models/notice');

// Routes
module.exports = (app) => {
  // Index route
  app.get('/', async (req, res) => {
    const noticesTecno = await Notice.find({ 'categories.name': 'tecnologia' })
      .limit(15)
      .sort([['created', -1]]);

    const noticesPolitica = await Notice.find({ 'categories.name': 'politica' })
      .limit(15)
      .sort([['created', -1]]);

    const noticesSociedad = await Notice.find({ 'categories.name': 'sociedad' })
      .limit(15)
      .sort([['created', -1]]);

    res.render('home', {
      noticesTecno,
      noticesPolitica,
      noticesSociedad,
    });
  });
};
