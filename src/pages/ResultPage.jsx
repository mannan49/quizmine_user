import React from "react";
import ResultComponent from "../components/ResultComponent";

const ResultPage = () => {
  return (
    <div className="content flex-grow flex flex-col p-4 overflow-y-auto">
      <ResultComponent className="flex-grow" />
    </div>
  );
};

export default ResultPage;
