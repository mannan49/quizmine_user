import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllSkills } from "../api/SkillApi";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills, setChapterName } from "../store/subjectSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ChooseChapters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState("");
  const [filteredChapters, setFilteredChapters] = useState([]);
  const className = useSelector((state) => state.subject.className);
  const subjectName = useSelector((state) => state.subject.subjectName);
  const fetchedData = useSelector((state) => state.subject.fetchedData);
  const isLoading = useSelector((state) => state.subject.isLoading);

  const handleDownload = (chapterName) => {
    dispatch(setChapterName(chapterName));
    navigate("/show");
  };

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);
  useEffect(() => {
    const filteredChapters = fetchedData.filter((value) => {
      return value.class === className && value.subject === subjectName;
    });
    setFilteredChapters(filteredChapters);
    setChapter(filteredChapters.length > 0 ? filteredChapters[0].chapter : "");
  }, [className, subjectName, fetchedData]);
  console.log("filteredChapters", filteredChapters);

  return (
    <div className="content flex flex-col mx-auto">
      <h1 className="text-center text-xl text-primary font-bold">
        {className} Chapters List
      </h1>
      <table className="mx-2 lg:mx-auto mt-2 bg-main rounded-lg max-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 ">Sr#</th>
            <th className="px-4 py-2 border">Chapter</th>
            <th className="px-4 py-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">
                <Loader />
              </td>
            </tr>
          ) : (
            filteredChapters.map((chapter, index) => (
              <tr key={index} className="border-t border-gray-300 border">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{chapter.chapter}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="app-btn"
                    onClick={() => handleDownload(chapter.chapter)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChooseChapters;
