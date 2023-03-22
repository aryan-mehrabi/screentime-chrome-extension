import { useEffect, useState } from "react";

const useLocalStorage = (numDays) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(({screentime}) => {
      const days = []
      const today = new Date().toLocaleDateString().split("/");
      for (let i = 0; i < numDays; i++) {
        const date = today.map((d, index) => index === 1 ? +d - i : +d);
        days.push(screentime[date.join("/")])
      }
      setData(days);
    })
  }, []);

  return data;
};

export default useLocalStorage;

