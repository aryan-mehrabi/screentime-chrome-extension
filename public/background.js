(() => {
  const INTERVAL_TIME_SECONDS = 10;
  const IDLE_TIME_SECONDS = 60;

  // Perform screentiming process every 10s
  setInterval(() => {
    performScreenTiming();
  }, INTERVAL_TIME_SECONDS * 1000);

  // Check if user is active and in the chrome window OR
  // if user is idle but audio is playing (like when watching YT) update stats.
  const performScreenTiming = async () => {
    const [tab, window] = await Promise.all([
      getCurrentTab(),
      chrome.windows.getCurrent(),
    ]);
    chrome.idle.queryState(IDLE_TIME_SECONDS, status => {
      if (
        (status === "active" && window.focused) ||
        (status === "idle" && tab && tab.audible)
      ) {
        updateStats(tab);
      }
    });
  };

  // Get all data from storage and mutate them and set the mutated object to storage.
  // We put a if statement to check whether a website is the first time being timed.
  const updateStats = tab => {
    chrome.storage.local.get(["screentime"], function ({ screentime }) {
      const todayDate = new Date().toLocaleDateString();
      const tabHostName = new URL(tab.url).hostname;

      let todayScreentime = screentime[todayDate];
      if (!todayScreentime) {
        screentime[todayDate] = {};
        todayScreentime = screentime[todayDate];
      }

      let pageData = todayScreentime[tabHostName];
      if (!pageData) {
        todayScreentime[tabHostName] = {
          favIcon: tab.favIconUrl,
          name: tabHostName,
          screentime: 0,
        };
        pageData = todayScreentime[tabHostName];
      }

      pageData.screentime = pageData.screentime + INTERVAL_TIME_SECONDS;
      currentScreentime = 0;

      chrome.storage.local.set({ screentime });
    });
  };

  // Add event listener on installation to make sure screentime object
  // has been created at chrome storage.
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["screentime"], function ({ screentime }) {
      if (!screentime) {
        chrome.storage.local.set({ screentime: {} });
      }
    });
  });

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
})();
