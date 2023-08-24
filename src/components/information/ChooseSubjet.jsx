import React from "react";
import { classes } from "../../data/Data";
import { subjects } from "../../data/Data";
import { useDispatch, useSelector } from "react-redux";
import { setClassName, setSubjectName } from "../../store/subjectSlice";
import { Link, useNavigate } from "react-router-dom";

const ChooseSubjet = () => {
  const dispatch = useDispatch();
  const className = useSelector((state) => state.subject.className);
  const subjectName = useSelector((state) => state.subject.subjectName);

  const handleClick = (jamat, course) => {
    const newClassName = jamat.class;
    const newSubjectName = course;
    // console.log(newClassName, newSubjectName);
    dispatch(setClassName(newClassName));
    dispatch(setSubjectName(newSubjectName));
  };
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Choose Your Subject</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 pb-20 lg:pb-0">
        {classes.slice(1).map((jamat, index) => {
          return (
            <div
              key={index}
              className="mt-2 border-2 border-solid rounded-xl p-4 mx-2 bg-main"
            >
              <h1 className="text-center text-2xl font-bold">{jamat.class}</h1>
              <div className="grid grid-cols-2 gap-x-2 lg:gap-x-6">
                {subjects.slice(1).map((course, index) => {
                  return (
                    <div className="w-full">
                      <Link to="/choose/chapters">
                        <button
                          onClick={() => handleClick(jamat, course.subject)}
                          className="bg-primary text-white rounded-full py-1 min-w-full px-0 text-sm mt-2"
                        >
                          {course.subject}
                        </button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChooseSubjet;
