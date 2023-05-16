import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import firstImg from "../../images/first.jpg";
import Image from "next/image";
import ChatList from "@/components/ChatList";
import MessageList from "@/components/MessageList";
import Chat from "../../../model/Chat";
import axios from "axios";
import dbConnect from "../../../utils/dbConnect";

function index({ data: chats }) {
  const { data } = useSession();
  const [chatList, setChatList] = useState(JSON.parse(chats));
  const [isActiveChat, setIsActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isActiveChat) {
      getMessages();
    }
  }, [isActiveChat]);

  const getMessages = async () => {
    try {
      const res = await axios.get("/inbox/message/" + isActiveChat._id);
      setMessages(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="col-span-5 border border-gray-200 shadow-sm  m-8  rounded-sm grid grid-cols-5 relative ">
      <div className="col-span-2 border-r border-gray-200  py-4  ">
        <div className="flex items-center justify-end border-b border-gray-200 py-4 px-8">
          <div className="flex mr-24 ">
            <div className="font-bold capitalize text-md">
              {data?.user?.name}{" "}
            </div>
            <span className="ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
        </div>
        <div className="p-4 overflow-y-scroll h-[470px]">
          {chatList.map((chat, index) => {
            return chat.participants && chat.participants.length ? (
              <ChatList
                key={index}
                chat={chat}
                isActiveChat={isActiveChat}
                setIsActiveChat={setIsActiveChat}
              />
            ) : null;
          })}
        </div>
      </div>
      {isActiveChat ? (
        <MessageList
          setMessages={setMessages}
          messages={messages}
          chat={isActiveChat}
        />
      ) : (
        <div className=" col-span-3 flex justify-center items-center  flex-col gap-4">
          <div className="p-8 rounded-full h-24 w-24 border border-gray-200 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className=" h-12 w-12 absolute"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </div>
          <div className=" text-3xl font-medium">Your Message</div>
          <div className="text-sm text-gray-600">
            Send private photos and messages to a friend or group.
          </div>
          <button className="font-medium bg-blue-400 text-white py-2 px-3 rounded rounded-md">
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let chats = [];
  try {
    await dbConnect();
    chats = await Chat.find({ participants: session?.user?.id })
      .populate("participants")
      .populate({
        path: "participants",
        match: { _id: { $ne: session?.user?.id } }, // Exclude the current user from the receiver list
      })
      .sort({ createdAt: -1 })
      .exec();
  } catch (error) {}

  return {
    props: {
      data: JSON.stringify(chats),
    },
  };
}
