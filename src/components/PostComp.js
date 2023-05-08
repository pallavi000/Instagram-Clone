import Image from "next/image";
import React from "react";

function PostComp({ post }) {
  return (
    <div className=" px-8 mt-14">
      <div className="flex justify-between items-center bg-white ">
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
        <div className="font-bold text-gray-600 ">...</div>
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
