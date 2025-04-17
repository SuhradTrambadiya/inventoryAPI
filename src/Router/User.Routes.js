/**
 * User Routes for handling user-related operations.
 * 
 * Routes:
 * - POST /signUp: Creates a new user.
 * - POST /login: Logs in an existing user.
 * - POST /update: Updates user details (requires authentication).
 * - GET /profile: Retrieves the profile of the authenticated user.
 * - DELETE /delete: Deletes the profile of the authenticated user.
 * 
 * Middleware:
 * - verifyToken: Ensures the user is authenticated before accessing certain routes.
 * 
 * Controllers:
 * - createUser: Handles user creation.
 * - loginUser: Handles user login.
 * - updateUserDetails: Handles updating user details.
 * - getUserProfile: Handles fetching user profile.
 * - deleteUserProfile: Handles deleting user profile.
 */
import express from "express";
import {
  createUser,
  deleteUserProfile,
  getUserProfile,
  loginUser,
  updateUserDetails,
} from "../Controller/userController.js";
import verifyToken from "../Middleware/verifyToken.js";

const UserRouter = express.Router();

UserRouter.post("/signUp", createUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/update", verifyToken, updateUserDetails);
UserRouter.get("/profile", verifyToken, getUserProfile);
UserRouter.delete("/delete", verifyToken, deleteUserProfile);

export default UserRouter;
