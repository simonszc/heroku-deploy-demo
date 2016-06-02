'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./lib/error_handling.js');

const dbPort =process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';

mongoose.connect(dbPort);

const venRouter = require('./routes/venRouter');

app.use('/venues', venRouter);

const perfRouter = require('./routes/perfRouter');

app.use('/performances', perfRouter);

const Venue = require('./schema/venue');
const Performance = require('./schema/performance');

app.get('/showperformances/:neighborhood', (req, res) => {
  let nHood = req.params.neighborhood;
  console.log(nHood);
  Performance.find({'venueObject.neighborhood': nHood}, (err, performances) => {
    if(err) return res.json({'message': err});
    res.json(performances);
  })
})

app.listen(3000, () => {
  console.log('up on 3000')
});

module.exports = app;
