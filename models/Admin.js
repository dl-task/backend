const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Enquiries = mongoose.model("admin", AdminSchema);
