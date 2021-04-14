const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
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
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = Enquiries = mongoose.model("enquiries", EnquirySchema);
