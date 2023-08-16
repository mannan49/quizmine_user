// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import CustomLabel from "./CustomLabel";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTestResults,
//   selectActiveMCQ,
//   selectActiveMcqOption,
//   selectMcqs,
//   selectSelectedInformation,
//   setAnswers,
//   updateInformation,
// } from "../store/showMcqSlice";
// import { checkTest } from "../api/TestApi";

// const PracticeMCQs = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const MCQs = useSelector(selectMcqs);
//   const activeMCQ = useSelector(selectActiveMCQ);
//   const activeMcqOption = useSelector(selectActiveMcqOption);
//   const selectedInformation = useSelector(selectSelectedInformation);
//   const loading = useSelector((state) => state.mcq.loading);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   console.log("MCQs", MCQs);
//   // Function to show the test result
//   const showResult = async () => {
//     const selectedMcqs = selectedInformation.map((selectedMcq, index) => {
//       return {
//         id: selectedMcq.selectedIndex,
//         correct_option: selectedMcq.selectedOption,
//       };
//     });

//     const data = {
//       mcqs: selectedMcqs,
//     };

//     try {
//       await dispatch(fetchTestResults(data));
//       navigate("/results");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // Function to move to the next question
//   const callNext = () => {
//     if (!activeMcqOption) {
//       handleChange("");
//     }
//     // if (activeMCQ === MCQs.length - 1) {
//     //   showResult();
//     // }
//     dispatch(handleNext());
//   };

//   // Function to move to the previous question
//   const callPrevious = () => {
//     if (!activeMcqOption) {
//       handleChange("");
//     }
//     dispatch(handlePrevious());
//   };

//   // Function to handle the selection of an option
//   const handleChange = (option) => {
//     const selectedIndex = MCQs[activeMCQ].id;
//     const mcqData = {
//       selectedOption: option,
//       selectedIndex,
//     };
//     dispatch(updateInformation(mcqData));
//   };

//   // Function to move to the next question
//   const handleNext = () => {
//     if (currentIndex < MCQs.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else if (currentIndex === MCQs.length - 1) {
//       navigate("/results");
//     }
//   };

//   // Function to check if an option is selected
//   const getSelectedOption = (option) => {
//     if (option === activeMcqOption) {
//       return true;
//     }
//     return false;
//   };

//   // Function to move to the previous question
//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div className="w-full content">
//       <div className="text-center m-2">
//         <h1 className="text-2xl">Chapter#4 MCQs</h1>
//       </div>
//       <div className="flex justify-center items-center">
//         <div className="bg-headline w-full block border-2 border-primary rounded-lg px-2 lg:px-8 py-4 lg:w-2/3">
//           {MCQs.map((mcq, index) => {
//             if (index === activeMCQ) {
//               return (
//                 <>
//                   {/* Display question details */}
//                   <h3 className="text-xl lg:text-2xl font-bold text-center">
//                     Question#{index + 1} of {MCQs.length}
//                   </h3>
//                   <p className="lg:text-2xl mb-1">{mcq.statement}</p>
//                   {/* Display options */}
//                   <div className="flex-col justify-center space-y-2">
//                     {/* Option A */}
//                     <div className="flex">
//                       <input
//                         type="radio"
//                         name="option"
//                         id="optionA"
//                         value="A"
//                         className="app-radio-style-disable"
//                         defaultChecked={getSelectedOption("A")}
//                         onChange={(event) => handleChange(event.target.value)}
//                       />
//                       <CustomLabel htmlFor="optionA">
//                         A. {mcq.optionA}
//                       </CustomLabel>
//                     </div>
//                     {/* Option B */}
//                     <div className="flex">
//                       <input
//                         type="radio"
//                         name="option"
//                         id="optionB"
//                         value="B"
//                         className="app-radio-style-disable"
//                         defaultChecked={getSelectedOption("B")}
//                         onChange={(event) => handleChange(event.target.value)}
//                       />
//                       <CustomLabel className="label-option" htmlFor="optionB">
//                         B. {mcq.optionB}
//                       </CustomLabel>
//                     </div>
//                     {/* Option C */}
//                     <div className="flex">
//                       <input
//                         type="radio"
//                         name="option"
//                         id="optionC"
//                         value="C"
//                         className="app-radio-style-disable"
//                         defaultChecked={getSelectedOption("C")}
//                         onChange={(event) => handleChange(event.target.value)}
//                       />
//                       <CustomLabel className="label-option" htmlFor="optionC">
//                         C. {mcq.optionC}
//                       </CustomLabel>
//                     </div>
//                     {/* Option D */}
//                     <div className="flex">
//                       <input
//                         type="radio"
//                         name="option"
//                         id="optionD"
//                         value="D"
//                         defaultChecked={getSelectedOption("D")}
//                         onChange={(event) => handleChange(event.target.value)}
//                         className="app-radio-style-disable"
//                       />
//                       <CustomLabel className="label-option" htmlFor="optionD">
//                         D. {mcq.optionD}
//                       </CustomLabel>
//                     </div>
//                   </div>
//                   {/* Navigation buttons */}
//                   <div className="flex justify-around">
//                     <button className="app-pink-btn" onClick={callPrevious}>
//                       Previous
//                     </button>
//                     <br />
//                     <button className="app-pink-btn" onClick={callNext}>
//                       Next
//                     </button>
//                   </div>
//                 </>
//               );
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PracticeMCQs;
