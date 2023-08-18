import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAllSkills } from "../api/SkillApi";
import { GenerateTest } from "../api/TestApi";
import { classes, subjects } from "../data/Data";
import { setMcqs } from "../store/showMcqSlice";
import Loader from "./Loader";

const TestInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [numberOfMcqs, setNumberOfMcqs] = useState("");
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [wholeData, setWholeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      console.log("Calling Get All Skills");
      try {
        const response = await getAllSkills();
        if (response.ok) {
          const data = await response.json();
          setWholeData(data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchSkills();
  }, []);
  useEffect(() => {
    const filteredChapters = wholeData.filter((value, index) => {
      return value.class === className && value.subject === subject;
    });
    setFilteredObjects(filteredChapters);
    if (filteredChapters.length > 0) {
      setChapter(filteredChapters[0].chapter);
    }
  }, [className, subject]);
  const showMCQs = async (e) => {
    e.preventDefault();
    const skill_id = filteredObjects.find((value, index) => {
      return value.chapter === chapter;
    });
    const data = {
      skill_id: skill_id._id,
      number_of_mcqs: parseInt(numberOfMcqs),
    };
    try {
      setIsLoading(true);
      const response = await GenerateTest(data);
      if (response.ok) {
        const { message, error_code, data: mcqsData } = await response.json();
        if (error_code === 0) {
          // map
          // global state
          const formattedMCQs = mcqsData.map((mcqData, index) => {
            const parsedOptions = JSON.parse(mcqData.options);
            return {
              id: mcqData.id,
              statement: mcqData.statement,
              optionA: parsedOptions[0].value,
              optionB: parsedOptions[1].value,
              optionC: parsedOptions[2].value,
              optionD: parsedOptions[3].value,
            };
          });
          dispatch(setMcqs(formattedMCQs));
          navigate("/practice");
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full min-h-screen pb-16 lg:pb-0">
      <div className="bg-main border-2 border-primary rounded-xl px-2 lg:px-8 py-4 w-full lg:w-1/2 mx-auto">
        <div>
          <div>
            <h2 className="text-center text-xl font-bold">
              Let's start a quick test
            </h2>
            <p className="text-center text-xl mb-2">
              Fill the below requirements
            </p>
          </div>
        </div>
        <form
          className="practice-mcqs-content flex flex-col"
          onSubmit={showMCQs}
        >
          <select
            name="classes-dropdown"
            className="border-2 focus:border-black px-6 py-2 rounded-full text-xl mb-3"
            onChange={(e) => setClassName(e.target.value)}
            required
          >
            {classes.map((value, index) => {
              return <option value={value.class}>{value.class}</option>;
            })}
          </select>
          <select
            name="subjects-dropdown"
            className="border-2 focus:border-black px-6 py-2 rounded-full text-xl mb-3"
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            {subjects.map((subject, index) => {
              return <option value={subject.subject}>{subject.subject}</option>;
            })}
          </select>
          <label htmlFor="id-mcq" className="text-xl text-center">
            Select Chapter
          </label>
          <select
            name="chapters-dropdown"
            className="border-2 focus:border-black px-6 py-1 rounded-full text-xl mb-2"
            onChange={(e) => setChapter(e.target.value)}
            required
          >
            {filteredObjects.map((singleObject, index) => {
              return (
                <option value={singleObject.chapter}>
                  {singleObject.chapter}
                </option>
              );
            })}
          </select>
          <div className="flex flex-col justify-center">
            <label
              htmlFor="number-of-mcqs"
              className=" text-center text-xl mb-2"
            >
              Number of MCQs
            </label>
            <input
              type="number"
              required
              id="number-of-mcqs"
              className="border-2 focus:border-black px-6 py-1 rounded-full text-xl mb-4 w-full"
              onChange={(e) => setNumberOfMcqs(e.target.value)}
            />
          </div>
          <div className="mx-auto w-full">
            <button type="submit" className="app-btn w-full font-bold text-xl">
              {isLoading ? <Loader /> : "Start Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestInformation;
