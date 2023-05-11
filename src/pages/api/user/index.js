import User from "../../../../model/User";
import dbConnect from "../../../../utils/dbConnect";
import jwt from "jsonwebtoken";

export default async function user(req, res, query) {
  await dbConnect();
  const { method, body } = req;
  const { action } = req.query;
  if (method === "GET") {
    const users = await User.find();

    res.send(users);
  } else if (method === "POST") {
    if (req.body.action === "login") {
      const validUser = await User.findOne({ email: req.body.email });

      if (!validUser) {
        res.send("user not exist");
      } else {
        var token = jwt.sign(
          { _id: validUser._id, email: validUser.email },
          "12345"
        );
        res.json({ token, user: validUser });
      }
    } else {
      const existEmail = await User.findOne({ email: req.body.email });
      if (existEmail) {
        res.send("Email already exist");
      } else {
        let user = new User({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        });
        user = await user.save();
        console.log(user, "register user");
        res.send(user);
      }
    }
  }
}
