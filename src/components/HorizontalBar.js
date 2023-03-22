import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const HorizontalBar = ({ labels, datas }) => {
  const ref = useRef(null);

  useEffect(() => {
    new Chart(ref.current, config);
  }, []);

  console.log(labels, datas);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Screen Time",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgb(255, 99, 132)",
        data: datas,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    plugins: [ChartDataLabels],
    options: {
      indexAxis: "y",
      layout: {
        padding: {
          right: 30,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
          formatter: function (value, context) {
            return value + "s";
          },
        },
        legend: {
          display: false,
        },
      },
    },
  };
  return <canvas ref={ref} />;
};

export default HorizontalBar;
