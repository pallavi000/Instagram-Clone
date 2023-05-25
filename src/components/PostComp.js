import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

function PostComp({ post }) {
  const { data: session } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const createChatList = async () => {
    try {
      var data = {
        participants: [post.user_id._id, session.user.id],
      };

      const res = await axios.post("/inbox/chat", data);
      router.push("/inbox");
      console.log(res.data, "result");

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" px-8 mt-8">
      <div className="flex justify-between items-center bg-white relative ">
        <div className="flex justify-center items-center gap-2">
          <div className="rounded-full relative h-10 w-10  border-blue-950 border-2 ">
            <Image
              src={post.image}
              alt="Example Image"
              layout="responsive"
              height={64}
              width={64}
              className="rounded-full  object-cover  ig-user-profile"
            />
          </div>
          <div className="text-sm text-gray-600 font-bold capitalize">
            {post.user_id?.name}
          </div>
        </div>

        <div
          className="font-bold text-gray-600 cursor-pointer "
          onClick={() => setShowDropDown(!showDropDown)}
        >
          ...
        </div>
        {showDropDown && (
          <div className="bg-white p-4 border border-gray-200 rounded-3xl shadow-sm absolute top-8 right-0">
            <div
              className="text-sm cursor-pointer"
              onClick={() => createChatList()}
            >
              Send Message
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 post-img-container shadow-sm rounded-md ">
        <Image
          src={post.image}
          alt="Example Image"
          layout="responsive"
          height={100}
          width={100}
          className="rounded-md  post-img "
        />
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2 ">
          {isLiked ? (
            <HeartIcon
              className="h-7 w-7 font-[900] cursor-pointer text-red-600"
              onClick={() => setIsLiked(!isLiked)}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 cursor-pointer"
              onClick={() => setIsLiked(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
          <ChatBubbleOvalLeftIcon className="h-7 w-7 cursor-pointer" />
          <PaperAirplaneIcon className="h-7 w-7 cursor-pointer" />
        </div>
        <div>
          <BookmarkIcon className="h-7 w-7" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <div className="text-sm font-medium text-gray-900 capitalize">
          {post.user_id?.name}
        </div>
        <div className="text-sm ">You got it right</div>
      </div>
      <input
        className="outline-0 border-0 text-sm text-gray-600 pb-4 w-full py-2"
        placeholder="Add new comment...."
      />
      <div className=" border-b border-gray-300 pb-2"></div>
    </div>
  );
}

export default PostComp;
