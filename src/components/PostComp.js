import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

function PostComp({ post }) {
  const { data: session } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

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
    <div className=" px-8 mt-14">
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

      <div className="mt-4 post-img-container shadow-sm ">
        <Image
          src={post.image}
          alt="Example Image"
          layout="responsive"
          height={100}
          width={100}
          className="rounded-sm  post-img"
        />
      </div>
    </div>
  );
}

export default PostComp;
