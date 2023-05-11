const mongoose = require("mongoose");
import User from "./User";

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String },
    image: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
