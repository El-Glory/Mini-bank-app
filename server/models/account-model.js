import mongoose from "mongoose";

accountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  timeStamps: {
      type: Date,
      default: Date.now

  },
  owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: User
  },
  accountType:{
      type: String,
      default: "savings",
      enum: ["savings","current"]
  },
  accountStatus: {
      type: String,
      default: "active",
      enum: ["dormant", "active", "draft"]
  },
  accountBalance: {
      type: Number
  }
});


module.exports = mongoose.model('Account', accountSchema)