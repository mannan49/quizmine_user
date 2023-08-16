import React from "react";
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

const MCQsPractice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    }
  };

  const handleChange = (mcqId, option) => {
    dispatch(selectOption({ mcqId, option }));
  };

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
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
              <div className="option-label pl-2 lg:pl-8 flex text-sm lg:text-xl w-full bg-headline-color rounded-lg text-primary-color border border-headline-color shadow-md  hover:bg-slate-600 hover:text-headline mb-2">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionA_${mcq.id}`}
                  value="A"
                  // defaultChecked={getSelectedOption("A")}
                  onChange={() => handleChange(mcq.id, "A")}
                />
                <label
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionA"
                >
                  A. {mcq.optionA}
                </label>
              </div>
              <div className="option-label pl-2 lg:pl-8 flex text-sm lg:text-xl w-full bg-headline-color rounded-lg text-primary-color border border-headline-color shadow-md  hover:bg-slate-600 hover:text-headline mb-2">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionB_${mcq.id}`}
                  value="B"
                  // defaultChecked={getSelectedOption("B")}
                  onChange={() => handleChange(mcq.id, "B")}
                />
                <label
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionB"
                >
                  B. {mcq.optionB}
                </label>
              </div>
              <div className="option-label pl-2 lg:pl-8 flex text-sm lg:text-xl w-full bg-headline-color rounded-lg text-primary-color border border-headline-color shadow-md  hover:bg-slate-600 hover:text-headline mb-2">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionC_${mcq.id}`}
                  value="C"
                  className=""
                  // defaultChecked={getSelectedOption("C")}
                  onChange={() => handleChange(mcq.id, "C")}
                />
                <label
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionC"
                >
                  C. {mcq.optionC}
                </label>
              </div>
              <div className="option-label pl-2 lg:pl-8 flex text-sm lg:text-xl w-full bg-headline-color rounded-lg text-primary-color border border-headline-color shadow-md  hover:bg-slate-600 hover:text-headline mb-2">
                <input
                  type="radio"
                  name={`option${index}`}
                  id={`optionD_${mcq.id}`}
                  className=""
                  // defaultChecked={getSelectedOption("D")}
                  onChange={() => handleChange(mcq.id, "D")}
                />
                <label
                  className="text-lg box-content ml-4 h-full rounded-lg hover:text-white w-full py-1 lg:py-3"
                  htmlFor="optionD"
                >
                  D. {mcq.optionD}
                </label>
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
        Submit Test
      </button>
    </div>
  );
};

export default MCQsPractice;
