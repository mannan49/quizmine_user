import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MCQs } from "../data/Data";
import toast from "react-hot-toast";
import CustomLabel from "./CustomLabel";

const PracticeMCQs = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < MCQs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === MCQs.length - 1) {
      navigate("/results");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className="text-center m-2">
        <h1 className="text-2xl">Chapter#4 MCQs</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-headline w-full block border-2 border-primary rounded-lg px-2 lg:px-8 py-4 lg:w-2/3">
          {MCQs.map((mcq, index) => {
            if (index === currentIndex) {
              return (
                <>
                  <h3 className="text-xl lg:text-2xl font-bold text-center">
                    Question#{index + 1} of {MCQs.length}
                  </h3>
                  <p className="lg:text-2xl mb-1">{mcq.statement}</p>
                  <div className="flex-col justify-center space-y-2">
                    <div className="flex">
                      <input
                        type="radio"
                        name="option"
                        id="optionA"
                        value="A"
                        className="app-radio-style-disable"
                      />
                      <CustomLabel htmlFor="optionA">
                        A. {mcq.optionA}
                      </CustomLabel>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        name="option"
                        id="optionB"
                        value="B"
                        className="app-radio-style-disable"
                      />
                      <CustomLabel className="label-option" htmlFor="optionB">
                        B. {mcq.optionB}
                      </CustomLabel>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        name="option"
                        id="optionC"
                        value="C"
                        className="app-radio-style-disable"
                      />
                      <CustomLabel className="label-option" htmlFor="optionC">
                        C. {mcq.optionC}
                      </CustomLabel>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        name="option"
                        id="optionD"
                        value="D"
                        className="app-radio-style-disable"
                      />
                      <CustomLabel className="label-option" htmlFor="optionD">
                        D. {mcq.optionD}
                      </CustomLabel>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <button className="app-pink-btn" onClick={handlePrevious}>
                      Previous
                    </button>
                    <br />
                    <button className="app-pink-btn" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default PracticeMCQs;
