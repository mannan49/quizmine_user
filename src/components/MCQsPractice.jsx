import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelectedOptions,
  selectMcqs,
  selectOption,
  selectSelectedInformation,
  setResultData,
} from "../store/showMcqSlice";
import { checkTest } from "../api/TestApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import CustomLabel from "./CustomLabel";

const MCQsPractice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const MCQs = useSelector(selectMcqs);
  const selectedInformation = useSelector(selectSelectedInformation);
  const resultData = useSelector((state) => state.mcq.resultData);
  const handleSubmitTest = async () => {
    const selectedMcqs = selectedInformation.map((selectedMcq, index) => {
      return {
        id: selectedMcq.mcqId,
        correct_option: selectedMcq.option,
      };
    });

    const data = {
      totalLength: MCQs.length,
      mcqs: selectedMcqs,
    };
    try {
      setIsLoading(true);
      const response = await checkTest(data);
      if (response.ok) {
        const { message, error_code, data } = await response.json();
        if (error_code === 0) {
          dispatch(setResultData(data));
        }
        navigate("/results");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (mcqId, option) => {
    dispatch(selectOption({ mcqId, option }));
  };

  return (
    <div className="flex flex-col space-y-2 justify-center items-center pb-28 lg:pb-0">
      <button
        className="app-btn w-2/3 lg:w-1/3"
        type="button"
        onClick={handleSubmitTest}
      >
        {isLoading ? <Loader /> : "Submit Test"}
      </button>
      {MCQs.map((mcq, index) => {
        return (
          <div
            key={mcq.id}
            className="bg-main block border-2 b border-primary rounded-lg px-2 lg:px-8 py-4 w-full lg:w-2/3"
          >
            <h3 className="text-center text-xl lg:text-2xl font-bold">
              Question#{index + 1} of {MCQs.length}
            </h3>
            <p className="lg:text-xl mb-2">{mcq.statement}</p>
            <div className="options-container">
              <div className="flex items-center">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionA_${mcq.id}`}
                  value="A"
                  onChange={() => handleChange(mcq.id, "A")}
                  className="mr-1 mb-2 lg:mr-2"
                />
                <CustomLabel htmlFor="optionA">A. {mcq.optionA}</CustomLabel>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionB_${mcq.id}`}
                  value="B"
                  onChange={() => handleChange(mcq.id, "B")}
                  className="mr-1 mb-2 lg:mr-2"
                />
                <CustomLabel
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionB"
                >
                  B. {mcq.optionB}
                </CustomLabel>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionC_${mcq.id}`}
                  value="C"
                  onChange={() => handleChange(mcq.id, "C")}
                  className="mr-1 mb-2 lg:mr-2"
                />
                <CustomLabel
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionC"
                >
                  C. {mcq.optionC}
                </CustomLabel>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionD_${mcq.id}`}
                  onChange={() => handleChange(mcq.id, "D")}
                  className="mr-1 mb-2 lg:mr-2"
                />
                <CustomLabel
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionD"
                >
                  D. {mcq.optionD}
                </CustomLabel>
              </div>
            </div>
          </div>
        );
      })}
      <button
        className="app-btn w-2/3 lg:w-1/3"
        type="button"
        onClick={handleSubmitTest}
      >
        {isLoading ? <Loader /> : "Submit Test"}
      </button>
    </div>
  );
};

export default MCQsPractice;
