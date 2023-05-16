import User from "./User";

const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
    ],
    lastMessage: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
