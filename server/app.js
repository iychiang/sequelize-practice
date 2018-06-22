const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');
//grabs instantiated models/index.js sequelize object

const app = express();
// db.sequelize.sync();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send();
})

app.use('/api/authors', require('./db/routes/authors'));
app.use('/api/blogs', require('./db/routes/blogs'));

app.use((err, req, res, next) => {
  if(err) {
      console.error(err);
      return res.status(500).send('An internal server error occured');
  }

  next();
});
module.exports = app;