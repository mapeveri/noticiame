const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

// Connect to database
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
