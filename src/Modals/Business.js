import mongoose from "mongoose";

const business = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  type: {
    enum: ["online", "offline", "both"],
  },
  discountPercentage: {
    type: Number,
  },
});

const Business = mongoose.model("Business", business);

export default Business;
