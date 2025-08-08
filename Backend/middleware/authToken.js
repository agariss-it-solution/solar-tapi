const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const userModel = require("../models/user");
const Response = require("../helper/errHandler");

const authToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // Validate Bearer token format
    if (!token || !token.startsWith("Bearer")) {
      return Response.Error({
        res,
        status: 400,
        message: "Invalid token format",
      });
    }

    token = token.split(" ")[1];

    // Verify JWT
    jwt.verify(token,process.env.jwt_key, async (err, decoded) => {
      if (err) {
        return Response.Error({
          res,
          status: 401,
          message: "Token verification failed",
        });
      }

      // Decrypt userId
      const bytes = CryptoJS.AES.decrypt(decoded.userId, process.env.secret_key);
      const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

      // Find user and check if token is still active
      const user = await userModel.findById(decryptedUserId);
      if (!user || !user.tokens.includes(token)) {
        return Response.Error({
          res,
          status: 403,
          message: "Unauthorized or token has been removed",
        });
      }

      // Set user info in request
      req.userId = decryptedUserId;
      req.role = decoded.role;
      req.token = token;
      req.user = user;

      next();
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message || "Auth middleware failed",
    });
  }
};

module.exports = authToken;
