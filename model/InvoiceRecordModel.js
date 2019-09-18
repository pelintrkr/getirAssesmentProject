var mongoose = require('mongoose');

//schema definition
var recordSchema = mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number],
});

module.exports = mongoose.model('record', recordSchema);