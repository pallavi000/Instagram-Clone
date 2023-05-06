const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String },
    image: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: { user } },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("Post", PostSchema);
