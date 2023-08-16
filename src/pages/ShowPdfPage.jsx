import React from "react";
import PdfShow from "../components/PdfShow";

const ShowPdfPage = () => {
  return (
    <div className="content flex-grow flex flex-col p-4 overflow-y-auto">
      <PdfShow className="flex-grow" />
    </div>
  );
};

export default ShowPdfPage;
