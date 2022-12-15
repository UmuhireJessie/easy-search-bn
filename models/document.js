import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    nameOnDoc: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phoneEMail: {
      type: String,
      required: true,
    },
    reqDocument: {
      type: String,
      required: true,
    },
    orgDocument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orgs"
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default new mongoose.model("document", documentSchema);
