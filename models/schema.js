const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
  item1: {
    // Old way of setting the type (I think)
    type: String,
  },
  item2: String,
  item3: Number,
  Date: Date,
});

module.exports = mongoose.model('TestModel', testSchema, 'test_collection');
