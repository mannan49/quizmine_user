import React from "react";
import MCQsPractice from "../components/MCQsPractice";

const MCQsPracticePage = () => {
  return (
    <div className="content flex-grow flex flex-col p-4 overflow-y-auto">
      <MCQsPractice className="flex-grow" />
    </div>
  );
};

export default MCQsPracticePage;
