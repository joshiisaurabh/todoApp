var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var map=require('./server');
function verifyToken(req, res, next) {
  debugger
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  var userId = req.headers['userid'];
  if (!token) 
    return res.json({ auth: false, status: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token,"supersec"+userId, function(err, decoded) {      
    if (err) 
      return res.json({ auth: false, status: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;