import Image from "next/image";
import React, { useState } from "react";
import firstImg from "../images/post.jpg";
import dbConnect from "../../utils/dbConnect";
import axios from "axios";

function ChatList({ setIsActiveChat, chat, data }) {
  const getMessage = async () => {
    setIsActiveChat(chat);
  };

  return (
    <div
      className="flex justify-between items-center bg-white mb-4 "
      onClick={() => getMessage()}
    >
      <div className="flex justify-center items-center gap-2">
        <div className="rounded-full relative h-14 w-14 border  bg-gray-200  ">
          <Image
            src={firstImg}
            alt="Example Image"
            layout="responsive"
            height={56}
            width={56}
            className="rounded-full  object-cover  main-chat-profile"
          />
        </div>
        <div className="flex flex-col justify-center items-start text-sm">
          <div className=" text-black font-normal text-md">
            {chat.participants[0].name}
          </div>
          <div className=" text-gray-500 font-normal text-sm">
            {chat.lastMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
