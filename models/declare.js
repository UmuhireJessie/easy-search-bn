import mongoose from "mongoose";

const declareSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: Number,
    },
    cardNumber: {
      type: Number,
    },
    cardType: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Declare = mongoose.model("declare", declareSchema);
