import React from "react";
import TestInformation from "../information/TestInformation";

const MainContent = () => {
  return (
    <div className="content flex-grow p-4 overflow-y-auto">
      <TestInformation />
    </div>
  );
};

export default MainContent;
