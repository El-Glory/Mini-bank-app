import mongoose from "mongoose";
const Float = require('mongoose-float').loadType(mongoose)

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  createdOn: {
      type: Date,
      default: Date.now
 },
  owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  accountType:{
      type: String,
      enum: ["savings","current"]
  },
  accountStatus: {
      type: String,
      default: "active",
      enum: ["active", "dormant", "draft"]
  },
  accountBalance: {
      type: Float
  }
});


module.exports = mongoose.model('Account', accountSchema)