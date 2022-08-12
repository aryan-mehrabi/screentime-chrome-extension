import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const Popup = () => {
  const ref = useRef(null);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Screen Time",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      indexAxis: "y",
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
    },
  };

  useEffect(() => {
    const myChart = new Chart(ref.current, config);
  }, []);

  return (
    <div>
      <canvas ref={ref} />
    </div>
  );
};

export default Popup;
