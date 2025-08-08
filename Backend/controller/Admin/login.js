const userModel = require("../../models/user");
const Response = require("../../helper/errHandler");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return Response.Error({
                res,
                status: 400,
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return Response.Error({
                res,
                status: 400,
                message: "Invalid email or password",
            });
        }

        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.secret_key).toString(CryptoJS.enc.Utf8);
        if (decrypted !== password) {
            return Response.Error({
                res,
                status: 401,
                message: "Invalid email or password",
            });
        }

        // Filter valid (non-expired) tokens
        const now = Math.floor(Date.now() / 1000); // current time in seconds
        user.tokens = (user.tokens || []).filter((t) => {
            try {
                const decoded = jwt.verify(t, process.env.jwt_key);
                return decoded.exp > now;
            } catch {
                return false;
            }
        });

        // Enforce 2-device limit
        if (user.tokens.length >= 2) {
            return Response.Error({
                res,
                status: 403,
                message: "Already login another device. Please logout from another device.",
            });
        }

        // Generate and store new token
        const encryptedId = CryptoJS.AES.encrypt(user._id.toString(), process.env.secret_key).toString();
        const token = jwt.sign(
            { userId: encryptedId, role: user.role },
            process.env.jwt_key,
            { expiresIn: process.env.jwt_expire || "30d" }
        );

        user.tokens.push(token);
        await user.save();

        const { password: _, tokens, ...userData } = user._doc;

        return Response.Success({
            res,
            status: 200,
            message: "Login successful",
            data: {
                user: userData,
                token,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return Response.Error({
            res,
            status: 500,
            message: "Server error",
        });
    }
};

const logout = async (req, res) => {
    try {
        const user = req.user;
        const token = req.token;

        // Remove the current token from the user's tokens array
        user.tokens = (user.tokens || []).filter((t) => t !== token);
        await user.save();

        return Response.Success({
            res,
            status: 200,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.error("Logout error:", err);
        return Response.Error({
            res,
            status: 500,
            message: "Logout failed",
        });
    }
};

module.exports = { login, logout };
