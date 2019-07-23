var express = require("express");
var bodyParser = require("body-parser");
let mongoose= require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/myTodo', {useNewUrlParser: true});
var todoModel = mongoose.model('todoo', new Schema({ title: String }));
var app = express();
var User = require('./app/User');
var Todo = require('./app/todoSchema');
var VerifyToken = require('./VerifyToken');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');
//I had assume employees array as database as there were issues while setup of sql and mongodb(also time was limited) but I know how to interface mongodb.
var employees=[
]
app.use(bodyParser.json());
//Needeed this for cross domain .
app.use(function(req, res, next) {
  if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,userId')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
      if (req.method === 'OPTIONS') return res.sendStatus(200)
  }
  next()
})

// Initialize the app.
var server = app.listen(8090, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/*"/api/employee"
 * GET: fetch all employess.
 */
  app.get("/api/fetchEmployees", VerifyToken,function(req, res) {
  console.log("Hello"); 
   res.json(employees) ;
  });

  /*"/api/todo"
 * GET: fetch all todos.
 */  
  app.get("/api/fetchTodoList",VerifyToken, function(req, res) {
    var userId = req.headers['userid'];
    Todo.find({createdBy:userId},function(error, result) { 
      res.json({data:result,auth:true}) ;
      console.log(result) });
  });
   /*"/api/todo"
 * GET: fetch all todos.
 */  
app.post("/api/delete",VerifyToken, function(req, res) {
  debugger
  var id = req.body.id;
  Todo.remove({ _id:id}, function (err) {
    if (err) return res.json({status:'Error on the server.',auth: false});
    res.json({auth:true}) ;
  });
  });
  
  app.post("/api/authenticate", function(req, res) {
    console.log("Got login request",req.body.email,req.body.password)
    User.find({email:req.body.email},function(error,user) { 
      console.log(user);
      if (error) return res.json({status:'Error on the server.',auth: false});
    if (!user||user.length<1) return res.json({status:'No user found.',auth: false});
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
    if (!passwordIsValid) return res.json({ auth: false, token: null });
    var token = jwt.sign({ id: user[0]._id },'supersec'+user[0].email, {
      expiresIn: 24000 // expires in 24 hours
        });
       res.json({auth:true,token:token,userId:user[0].email}) ;
       console.log(user) });
    });

  app.post("/api/register", function(req, res) {
    User.find({email:req.body.email},function(error,user) { 
      console.log(user);
      if (error) return res.json({status:'Error on the server.',auth: false});
    if (user.length) return res.json({status:'No user found.',auth: false});
    else{
      console.log("Got register request",req.body.password)
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      console.log(hashedPassword);
      User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
      }, 
      function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        console.log(user); 
        res.json({auth:true}) ;

      });
    }
    });
    
  });
  
  app.post("/api/addTodo",VerifyToken,function(req,res){
    console.log(req.body)
    var userId = req.headers['userid'];
    var data=new Todo({title:req.body.title,createdBy:userId})
    data.save(function(error, result) { 
      res.json({auth:true,data:result}) ;
    })
  });
   

/*"/api/employee"
 *POST:add employee.
 */
 app.post("/api/addEmployee",[
   //validations server side
  check('email').isEmail(),
  check('city').isLength({ min: 1 }),
  check('state').isLength({ min: 1 }),
  check('address').isLength({ min: 1 }),
  check('firstName').isLength({ min: 1 })
], function(req, res) {
  const errors = validationResult(req);
  //If error in validations
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  //If validation is successfull
  var employee={firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email,state:req.body.state,city:req.body.city,address:req.body.address};
  employees.push(employee);
  res.json(employees);
 });
