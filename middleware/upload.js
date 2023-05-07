import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../public/uploads");
  },
  filename: function (req, file, cb) {
    var imageName = Math.random() + "." + file.originalname.split(".").pop();
    cb(null, imageName);
  },
});

const upload = multer({ storage });

export default upload;
