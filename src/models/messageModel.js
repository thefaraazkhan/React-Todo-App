const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String },
    },
    fromSelf: { type: Boolean },
    users: Array,
    sender: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
