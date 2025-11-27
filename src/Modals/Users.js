import mongoose from "mongoose";

const user = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  dob: {
    type: Date,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  mobNumber: {
    type: String,
    unique: true,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  },
  faceImage: {
    type: String,
  },
  faceRegistered: {
    type: Boolean,
    default: false,
  },
  activePlan: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", user);
export default User;
