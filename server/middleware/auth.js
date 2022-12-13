const jwt = require("jsonwebtoken");


function auth(req, res, next) {
    try {
      const token = req.cookies.token;

      // token null check
      if (!token) {
        return res.status(401).json({ errorMessage: "Unauthorized" });
      }

      // verify token is correct
      const verified = jwt.verify(token, process.env.JWT_SECRET); // will throw error if token is not valid. If it does match, this will decode it
      // console.log(verified);
      req.user = verified.user;
      next(); // continue execution
      
    } catch (err) {
      console.log(err);
      res.status(401).json({errorMessage: "Unauthorized"});
    }
}

module.exports = auth;