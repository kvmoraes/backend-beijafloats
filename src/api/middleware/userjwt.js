function verifyToken(req, res, next) {
    const secret = process.env.SECRET;
    const jwt = require('jsonwebtoken');
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token', error: err});
      }
  
      req.user = decoded;
      next();
    });
  }
  
  module.exports = verifyToken;