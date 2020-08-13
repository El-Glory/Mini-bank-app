import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["client", "staff"],
  },
  isAdmin: Boolean,
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
