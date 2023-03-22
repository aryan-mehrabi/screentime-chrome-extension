import React, { useEffect, useState } from "react";
import HorizontalBar from "./HorizontalBar";
import useLocalStorage from "../hooks/useLocalStorage";

const Popup = () => {
  const days = useLocalStorage(1);
  const [labels, setLables] = useState(null);
  const [data, setData] = useState(null);

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  // ];
  // const data = [10, 5, 21]

  useEffect(() => {
    if (days) {
      const labels = [];
      const data = [];
      for (const date in days[0]) {
        if (Object.hasOwnProperty.call(days[0], date)) {
          const website = days[0][date];
          labels.push(website.name);
          data.push(website.screentime);
        }
      }
      setData(data.slice(0, 5));
      setLables(labels.slice(0, 5));
    }
  }, [days]);

  return (
    <div>
      {labels && data && <HorizontalBar labels={labels} datas={data} />}
    </div>
  );
};

export default Popup;
