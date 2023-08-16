import { useSelector } from "react-redux";
import { ResponsivePie } from "@nivo/pie";
import { useNavigate } from "react-router";

function ResultComponent() {
  const navigate = useNavigate();
  const resultData = useSelector((state) => state.mcq.resultData);

  const handleAgainTest = () => {
    navigate("/");
  };

  const correct = resultData.valid_answers;
  const wrong = resultData.invalid_answers;
  const total = resultData.total;
  const unattempted =
    resultData.total - (resultData.valid_answers + resultData.invalid_answers);

  const data = [
    {
      id: "Correct",
      label: "Correct",
      value: correct,
      color: "rgba(79, 193, 148, 1)",
    },
    {
      id: "Wrong",
      label: "Wrong",
      value: wrong,
      color: "rgba(220, 38, 38, 1)",
    },
    {
      id: "Unattempted",
      label: "Unattempted",
      value: unattempted,
      color: "rgba(148, 163, 184 , 1)",
    },
  ];
  function percentageCalculator() {
    return Math.round((correct / total) * 100);
  }
  return (
    <>
      <div className="flex px-4 py-2 flex-col items-center lg:flex-row min-h-screen justify-around  w-full ">
        <div className="bg-main border-none rounded-xl mb-4 px-8 py-4 w-full lg:w-1/3">
          <h1 className="text-2xl text-center">Your Result</h1>
          <p className="text-center lg:text-xl w-full bg-primary rounded-lg text-white border border-headline-color shadow-lg py-1 lg:py-2 px-2 lg:px-8 block mb-2 hover:bg-headline hover:text-primary">
            Total : {total}
          </p>
          <p className="text-center lg:text-xl w-full bg-tertiary rounded-lg text-white border border-headline-color shadow-md py-1 lg:py-2 px-2 lg:px-8 block mb-2 hover:bg-headline hover:text-tertiary">
            Correct : {correct}
          </p>
          <p className="text-center lg:text-xl w-full bg-red-600 rounded-lg text-white border border-headline-color shadow-md py-1 lg:py-2 px-2 lg:px-8 block mb-2 hover:bg-white hover:text-red-600">
            Wrong : {wrong}
          </p>
          <p className="text-center lg:text-xl w-full bg-slate-600 rounded-lg text-white border border-headline-color shadow-md py-1 lg:py-2 px-2 lg:px-8 block mb-2 hover:bg-white hover:text-slate-700">
            Unattempted : {unattempted}
          </p>
          <p className="text-center lg:text-xl w-full bg-white rounded-lg text-primary border border-headline-color shadow-md py-1 lg:py-2 px-2 lg:px-8 mb-4 block hover:bg-primary hover:text-headline">
            Percentage : {percentageCalculator() + "%"}
          </p>
          <button
            className="app-btn w-full lg:text-xl font-bold"
            onClick={handleAgainTest}
          >
            Again Test
          </button>
        </div>
        <div className="border-none py-4 rounded-lg w-full mb-4 lg:w-1/3 bg-main">
          <h1 className="text-2xl text-center font-bold">Performance Chart</h1>
          <div className="h-80">
            <ResponsivePie
              data={data}
              margin={{ top: 0, right: 85, bottom: 30, left: 80 }}
              innerRadius={0.5}
              colors={{ datum: "data.color" }}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 5]],
              }}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 6,
                  translateY: 10,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 20,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultComponent;
