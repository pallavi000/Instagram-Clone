import React from "react";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";

function Layouts({ children }) {
  const { data, status } = useSession();
  return (
    <div className="grid grid-cols-6 gap-4">
      {status === "authenticated" && (
        <div className=" col-span-1  ">
          <Sidebar />
        </div>
      )}

      {children}
    </div>
  );
}

export default Layouts;
