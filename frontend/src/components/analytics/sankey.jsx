import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Sankey({dataCount}) {
  const [weights, setWeights] = useState(dataCount);
  const [data , setData] = useState([]);
  const [options, setOptions] = useState({});

  // 1. job application confirmation
  // 2. job application rejection
  // 3. interview invitation
  // 4. position offered
  // 5. position waitlisted
  useEffect(() => {
    const data = [
      ["From", "To", "Weight"],
      ["Application Received", "Rejection", weights[0]],
      ["Application Received", "Interview", weights[1]],
      ["Interview", "Offer", weights[2]],
      ["Interview", "Waitlisted", weights[3]],
      ["Interview", "Rejection", weights[0]],
      ["Application Received", "No Response", weights[4]],
    ];
    setData(data);

    const options = {
      sankey: {
        node: {
          colors: ['blue', 'red', 'yellow', 'green', 'orange'],
          label: {
            fontName: "Arial",
            fontSize: 14,
            color: "black",
            bold: true,
            italic: false,
          }
        }
      }
    };
    setOptions(options);

  }, [weights]); 
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
