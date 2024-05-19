import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Sankey({dataCount}) {
  // const [weights, setWeights] = useState(dataCount);
  const [data , setData] = useState([]);
  const [options, setOptions] = useState({});

  console.log("Data Count: ", dataCount)
  // 1. job application confirmation
  // 2. job application rejection
  // 3. interview invitation
  // 4. position offered
  // 5. position waitlisted
  useEffect(() => {
    // console.log("Weights: ", weights)
    const data = [
      ["From", "To", "Weight"],
      ["Application Received", "Rejection", dataCount[0]],
      ["Application Received", "Interview", dataCount[1]],
      ["Interview", "Offer", dataCount[2]],
      ["Interview", "Waitlisted", dataCount[3]],
      ["Interview", "Rejection", dataCount[0]],
      ["Application Received", "No Response", dataCount[4]],
    ];
    setData(data);

    const options = {
      sankey: {
        node: {
          colors: ['blue', 'red', 'yellow', 'green', 'orange']
        }
      }
    };
    setOptions(options);

  }, [dataCount]); 
  return (
    <Chart
      chartType="Sankey"
      width="40%"
      height="200px"
      data={data}
      options={options}
    />
  );
}
