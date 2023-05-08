import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Story({ img }) {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="rounded-full relative h-16 w-16 top-0 border-blue-950 border-2 ">
        <Image
          src={img.img}
          alt="Example Image"
          layout="responsive"
          height={64}
          width={64}
          className="rounded-full  object-cover  ig-story"
        />
      </div>
      <div className="text-xs">{session?.user?.name}</div>
    </div>
  );
}

export default Story;
