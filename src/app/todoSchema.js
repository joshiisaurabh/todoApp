var mongoose = require('mongoose');  
var todoSchema = new mongoose.Schema({  
  title: String,
  createdBy:String
});
mongoose.model('Todo',todoSchema);
module.exports = mongoose.model('Todo');