const mongoose = require('mongoose')

const connection = mongoose.connect(
    "mongodb+srv://aarpitkumarsahu99:arpit@cluster0.3gn2bgf.mongodb.net/cointab?retryWrites=true&w=majority"
  );
  
  module.exports = {
    connection,
  };