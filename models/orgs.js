import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: Number,

    },
    password: {
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

export const Org = mongoose.model("Orgs", orgSchema);
