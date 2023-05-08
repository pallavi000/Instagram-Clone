import React from "react";
import Sidebar from "./Sidebar";

function Layouts({ children }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className=" col-span-1  ">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

export default Layouts;
