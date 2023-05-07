import formidable from "formidable";
import Post from "../../../../model/Post";
import dbConnect from "../../../../utils/dbConnect";
const uuidv4 = require("uuidv4");
const fs = require("fs");
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function post(req, res, query) {
  await dbConnect();
  const { method, body } = req;
  if (method === "GET") {
    const posts = await Post.find();
    res.send(posts);
  } else if (method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading image" });
      }
      const { originalFilename, filepath } = files.image;
      const fileData = await fs.promises.readFile(filepath);
      const imageName = Math.random() + "." + originalFilename.split(".").pop();
      const uploadpath =
        __dirname + "../../../../../public/uploads/" + imageName;
      await fs.promises.writeFile(uploadpath, fileData);

      const picture = "/uploads/" + imageName;

      var post = new Post({
        caption: fields.caption,
        image: picture,
        user_id: fields.user_id,
      });
      await post.save();

      res.send(post);
    });
  }
}
