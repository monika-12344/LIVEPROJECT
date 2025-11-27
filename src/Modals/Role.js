import mongoose from "mongoose";

const role = new mongoose.Schema({
  rolename: {
    type: String,
    enum: ["customer", "business", "admin", "subadmin"],
  },
});

const Role = mongoose.model("Role", role);
export default Role;
