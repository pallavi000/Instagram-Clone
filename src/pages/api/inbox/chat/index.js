import Chat from "../../../../../model/Chat";
import dbConnect from "../../../../../utils/dbConnect";

export default async function chat(req, res, query) {
  await dbConnect();
  const { method, body } = req;
  if (method === "GET") {
    res.send("hello");
  } else if (method === "POST") {
    try {
      console.log("hello", typeof body.participants);

      const existingChat = await Chat.findOne({
        participants: body.participants,
      });
      if (existingChat) {
        console.log("exist");
        return res.send(existingChat);
      }

      var chat = new Chat({
        participants: body.participants,
      });
      await chat.save();
      res.send(chat);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  }
}
