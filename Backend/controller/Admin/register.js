const userModel = require("../../models/user");
const Response = require("../../helper/errHandler");
const CryptoJS = require("crypto-js");

const register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return Response.Error({
        res,
        status: 400,
        message: "Email and password are required",
      });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.Error({
        res,
        status: 400,
        message: "Invalid email format",
      });
    }

    // 3. Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Response.Error({
        res,
        status: 400,
        message: "Password must include uppercase, lowercase, number, and special character",
      });
    }

    // 4. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Response.Error({
        res,
        status: 400,
        message: "Email already exists",
      });
    }

    // 5. Encrypt password using AES
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.secret_key).toString();

    // 6. Create and save user
    const newUser = await userModel.create({
      email,
      password: encryptedPassword,
      ...rest,
    });

    // 7. Return safe response without password
    const { password: _, ...userData } = newUser._doc;

    return Response.Success({
      res,
      status: 201,
      message: "User registered successfully",
      data: userData,
    });

  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Server error: " + error.message,
    });
  }
};

module.exports = register;
