import React from "react";
import ChooseChapters from "../components/ChooseChapters";

const ChooseChaptersPage = () => {
  return (
    <div className="flex-grow flex flex-col p-4 overflow-y-auto">
      <ChooseChapters className="flex-grow" />
    </div>
  );
};

export default ChooseChaptersPage;
