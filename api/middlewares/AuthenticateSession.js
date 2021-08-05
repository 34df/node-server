const jwt = require('jsonwebtoken');

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

module.exports = AuthenticateSession = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;

    // Verify token
    jwt.verify(bearerToken, process.env.TOKEN_SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
        return;
      } else if (req.baseUrl.split('/')[1] === data.user.type.toLowerCase()) {
        if (req.method === 'GET')
          req.query.user_id = data.user.id;
        else if (req.method === 'POST')
          req.body.user_id = data.user.id;

        next();
      } else {
        res.sendStatus(403);
        return;
      };
    });
  } else {
    res.sendStatus(403);
    return;
  };
}