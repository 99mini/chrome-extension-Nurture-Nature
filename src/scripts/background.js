async function fecthCommitCount(username) {
  let commitCount = 0;
  let commitsByDay = {};
  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await repoResponse.json();
  for (const repo of repos) {
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?author=${username}`
    );

    const commits = await commitResponse.json();
    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date)
        .toISOString()
        .split("T")[0];
      if (!commitsByDay[date]) {
        commitsByDay[date] = 0;
      }
      commitsByDay[date]++;
    });

    commitCount += commits.length;
  }

  return { commitsByDay, commitCount };
}

async function setCommitCount(username) {
  const { commitsByDay, commitCount } = await fecthCommitCount(username);
  const interval = 10;

  console.log("setCommitCount");
  const formatingCommitsByDay = formateCommitsByDay(commitsByDay, interval);

  setStorage("commitCount", commitCount);
  setStorage("commitsByDay", formatingCommitsByDay);
}

function setStorage(key, value) {
  const setObj = {};
  setObj[key] = value;
  chrome.storage.local.set(setObj);
}

function getStorage(key) {
  chrome.storage.local.get(key, function (result) {
    console.log(result[key]);
    if (result[key]) {
      return result[key];
    } else {
      return undefined;
    }
  });
}

/**
 * @param {Date} date `Date`
 * @returns `dateString`: `string`
 * - formating yyyy-mm-dd
 */
function getDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;
  return dateString;
}

/**
 *
 * @param {number}interval
 * @returns `dates`: `Date[]`
 * - 오늘부터 인터벌 기간 과거 동안의 Date 객체를 반환한다.
 * - 예] interval = 10, 오늘 1월 11일 => 1월 11일 ~ 1월 1일 까지의 Date 객체 반환
 */
function getDateObjList(interval) {
  const dates = [];

  for (let i = 0; i < interval; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

/**
 *
 * @param {Object} commitsByDayObj
 * @param {number} interval
 */
function formateCommitsByDay(commitsByDayObj, interval) {
  const dates = getDateObjList(interval);
  const dateStringList = dates.map((date) => getDateString(date));
  let returnList = [];
  dateStringList.map((dateString) => {
    let tempObj = {};
    if (!commitsByDayObj[dateString]) {
      tempObj[dateString] = 0;
    } else {
      tempObj[dateString] = commitsByDayObj[dateString];
    }
    returnList.push(tempObj);
  });

  console.log(returnList.reverse());
  return returnList.reverse();
}

chrome.runtime.onInstalled.addListener(() => {
  // let color = "#3aa757";
  // chrome.storage.sync.set({ color });
  // console.log("Default background color set to %cgreen", `color: ${color}`);

  const username = "99mini";

  setCommitCount(username);
  getStorage("commitCount");
  getStorage("commitsByDay");
});
