// chrome local storage key
const USER_ID = "userId";
const COMMIT_COUNT = "commitCount";
const COMMITS_BY_DAY = "commitsByDay";

// background action name
const REFRESH_ACTION = "refreshAction";

/**
 *
 * @param {string} username: github username
 * @returns {object[]} commitsByDay `object[]`
 *
 * commitsByDay = [
 * {
 *
 *  dateTiem: `string`;
 *
 *  commits: `number`;
 *
 * } ,...]
 */
async function fecthUserInfo(username) {
  const baseUrl = process.env.API_URL;
  const url = "/api/user";
  const query = "?username=" + username;
  const res = await fetch(baseUrl + url + query);
  const resJson = await res.json();

  let commitsByDay = [];
  resJson.map((day) => {
    let commitsOfDay = {};
    commitsOfDay[day.dateTime] = day.commits;
    commitsByDay.push(commitsOfDay);
  });

  return commitsByDay;
}

/**
 *
 * @param {object[]} commitsByDay
 * @returns
 */
function calcCommitCount(commitsByDay) {
  let commitsOfTenDays = 0;
  commitsByDay.map((day) => {
    commitsOfTenDays += Number(Object.values(day));
  });

  return commitsOfTenDays;
}

/**
 *
 * @param {*} username
 */
async function setCommitCount(username) {
  const commitsByDay = fecthUserInfo(username);
  const commitCount = calcCommitCount(commitsByDay);

  setStorage(COMMIT_COUNT, commitCount);
  setStorage(COMMITS_BY_DAY, commitsByDay);
}

/**
 * chrome local 저장소에 {key: value} 형태로 저장하기
 * @param {string} key
 * @param {string} value
 */
function setStorage(key, value) {
  let setObj = {};
  setObj[key] = value;
  chrome.storage.local.set(setObj);
}

/**
 * chrome local 저장소에서 key값으러 데이터 가져오기
 * @param {string} key
 *
 */
async function getStorage(key) {
  let newPromise = new Promise(function (resolve, reject) {
    chrome.storage.local.get(key, function (result) {
      resolve(result[key]);
    });
  });
  let result = await newPromise;
  return result;
}

// 호출 받기
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === REFRESH_ACTION) {
    const userId = await getStorage(USER_ID);
    await setCommitCount(userId);

    return await getStorage(COMMITS_BY_DAY);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  setStorage(USER_ID, "");
  setStorage(COMMIT_COUNT, 0);
  setStorage(COMMITS_BY_DAY, {});
});
