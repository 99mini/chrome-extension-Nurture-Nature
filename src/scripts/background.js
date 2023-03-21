/**
 *
 * @param {*} username
 * @returns
 */
async function fecthCommitCount(username) {
  let commitCount = 0;
  let commitsByDay = {};
  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await repoResponse.json();
  for (const repo of repos) {
    const commitResponse = await fetch(
      // get public commit count
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?author=${username}`
      // https://api.github.com/repos/99mini/pygame_study/commits?author=99mini
    );

    const commits = await commitResponse.json();
    commitCount += commits.length;
    commits.forEach((commit) => {
      const date = new Date(commit.commit.author.date)
        .toISOString()
        .split("T")[0];
      if (!commitsByDay[date]) {
        commitsByDay[date] = 0;
      }
      commitsByDay[date]++;
    });
  }

  return { commitsByDay, commitCount };
}

/**
 *
 * @param {*} username
 */
async function setCommitCount(username) {
  const { commitsByDay, commitCount } = await fecthCommitCount(username);
  const interval = 10;

  console.log("setCommitCount");
  const formatingCommitsByDay = formateCommitsByDay(commitsByDay, interval);

  setStorage("commitCount", commitCount);
  setStorage("commitsByDay", formatingCommitsByDay);
}

/**
 * chrome local 저장소에 {key: value} 형태로 저장하기
 * @param {string} key
 * @param {string} value
 */
function setStorage(key, value) {
  const setObj = {};
  setObj[key] = value;
  chrome.storage.local.set(setObj);
}

/**
 * chrome local 저장소에서 key값으러 데이터 가져오기
 * @param {string} key
 *
 */
function getStorage(key) {
  chrome.storage.local.get(key, function (result) {
    if (result[key]) {
      return result[key];
    } else {
      return undefined;
    }
  });
}

/**
 *
 * @param {Date} date `Date`
 * @returns {string} yyyy-mm-dd 형태의 string
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
 * @returns {Date[]}
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
 * @param {object} commitsByDayObj
 * @param {number} interval
 * @returns {object[]} interval 기간동안의 커밋 리스트 {날짜: 개수}
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "refreshAction") {
    setCommitCount(username);

    console.log("background.js called popup.js");
    return getStorage("commitsByDay");
  }
});

const username = "99mini";

chrome.runtime.onInstalled.addListener(() => {
  setCommitCount(username);
  getStorage("commitCount");
  getStorage("commitsByDay");
});
