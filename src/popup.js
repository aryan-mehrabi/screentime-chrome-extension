import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
    plugins: [ChartDataLabels],
    options: {
      indexAxis: "y",
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
            drawOnChartArea: false,
            drawTicks: false,
          },
        },
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
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
