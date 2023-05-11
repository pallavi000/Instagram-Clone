import Chat from "./Chat";
import User from "./User";

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Chat,
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
