

import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "/default-avatar.jpeg" },

    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;