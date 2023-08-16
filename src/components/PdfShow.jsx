import React from "react";
import { useEffect } from "react";
import { getAllNotes } from "../api/NotesApi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";

const PdfShow = () => {
  const className = useSelector((state) => state.subject.className);
  const subjectName = useSelector((state) => state.subject.subjectName);
  const chapterName = useSelector((state) => state.subject.chapterName);
  const [pdfURL, setPdfURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Calling Get All Notes");
      try {
        const response = await getAllNotes();
        setIsLoading(true); // Start loading
        if (response.ok) {
          const { data } = await response.json();
          const filteredNotes = data.filter((value) => {
            return (
              value.className === className &&
              value.subject === subjectName &&
              value.skill === chapterName
            );
          });
          if (filteredNotes) {
            const pdfURL = `https://modernisb.github.io/${
              filteredNotes[0].githubRepo
            }/${encodeURIComponent(`${filteredNotes[0].pdfFileName}`)}`;
            setPdfURL(pdfURL);
          }
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchNotes();
  }, [className, subjectName, chapterName]);

  console.log("PDFURL", pdfURL);
  console.log("isLoading", isLoading);

  const handleDownload = () => {
    window.open(pdfURL, "_blank");
  };

  return (
    <div className="w-full space-y-4 flex flex-col items-center">
      <h2 className="border-none rounded-full lg:w-1/2 bg-primary px-4 py-1 text-main text-center lg:text-xl mt-2">
        {chapterName}
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <iframe
            src={pdfURL}
            title="PDF Viewer"
            frameBorder="0"
            className="lg:w-3/4 mx-auto min-h-screen rounded-xl"
            style={{ maxWidth: "100%" }}
          >
            <p>Your browser does not support PDF viewing.</p>
          </iframe>
        </div>
      )}
      <button
        className="border-none rounded-full w-1/2 bg-primary px-4 py-1 text-main text-xl"
        onClick={handleDownload}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PdfShow;
