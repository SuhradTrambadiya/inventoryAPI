/**
 * Middleware to verify the JSON Web Token (JWT) from the request header.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.header - The headers of the HTTP request.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The callback to pass control to the next middleware.
 *
 * @returns {void} Sends a 401 response if the token is missing or invalid.
 *
 * @throws {Error} If the token is invalid or cannot be verified.
 *
 * @description
 * This middleware extracts the JWT from the "Authorization" header, verifies it using
 * the secret key stored in the environment variable `JWT_SECRET`, and attaches the
 * decoded user information to the `req.user` object. If the token is missing or invalid,
 * it responds with a 401 status and an appropriate error message.
 */
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract the token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key from .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyToken;
