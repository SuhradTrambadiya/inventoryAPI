import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

export default mongoose.model("User", UserSchema);
// This exports the User model, which can be used to interact with the "users" collection in the database.