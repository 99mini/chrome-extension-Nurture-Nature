// img path
const DEMO_IMG_PAHT = "../assets/images/plant/plant00.png";

// chrome local storage key
const USER_ID = "userId";
const COMMIT_COUNT = "commitCount";
const COMMITS_BY_DAY = "commitsByDay";

// background action name
const REFRESH_ACTION = "refreshAction";
const CLOSE_POPUP = "closePopup";

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
  const baseUrl =
    "http://chromeextensionappbe-env.eba-q3tmhahd.ap-northeast-2.elasticbeanstalk.com";
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

// not use
// /**
//  *
//  * @param {*} username
//  * @returns
//  */
// async function fecthCommitCount(username) {
//   let commitCount = 0;
//   let commitsByDay = {};
//   const repoResponse = await fetch(
//     `https://api.github.com/users/${username}/repos`
//   );
//   const repos = await repoResponse.json();
//   for (const repo of repos) {
//     const commitResponse = await fetch(
//       // get public commit count
//       `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?author=${username}`
//       // https://api.github.com/repos/99mini/pygame_study/commits?author=99mini
//     );

//     const commits = await commitResponse.json();
//     commitCount += commits.length;
//     commits.forEach((commit) => {
//       const date = new Date(commit.commit.author.date)
//         .toISOString()
//         .split("T")[0];
//       if (!commitsByDay[date]) {
//         commitsByDay[date] = 0;
//       }
//       commitsByDay[date]++;
//     });
//   }

//   return { commitsByDay, commitCount };
// }

/**
 *
 * @param {*} username
 */
async function setCommitCount(username) {
  const commitsByDay = await fecthUserInfo(username);
  const commitCount = calcCommitCount(commitsByDay);

  // console.log(username);
  // console.log(commitsByDay);
  // console.log(commitCount);

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

// not use
// /**
//  *
//  * @param {Date} date `Date`
//  * @returns {string} yyyy-mm-dd 형태의 string
//  */
// function getDateString(date) {
//   const year = date.getFullYear().toString();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");

//   const dateString = `${year}-${month}-${day}`;
//   return dateString;
// }

// not use
// /**
//  *
//  * @param {number}interval
//  * @returns {Date[]}
//  * - 오늘부터 인터벌 기간 과거 동안의 Date 객체를 반환한다.
//  * - 예] interval = 10, 오늘 1월 11일 => 1월 11일 ~ 1월 1일 까지의 Date 객체 반환
//  */
// function getDateObjList(interval) {
//   const dates = [];

//   for (let i = 0; i < interval; i++) {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     dates.push(date);
//   }
//   return dates;
// }

// not use
// /**
//  *
//  * @param {object} commitsByDayObj
//  * @param {number} interval
//  * @returns {object[]} interval 기간동안의 커밋 리스트 {날짜: 개수}
//  */
// function formateCommitsByDay(commitsByDayObj, interval) {
//   const dates = getDateObjList(interval);
//   const dateStringList = dates.map((date) => getDateString(date));
//   let returnList = [];
//   dateStringList.map((dateString) => {
//     let tempObj = {};
//     if (!commitsByDayObj[dateString]) {
//       tempObj[dateString] = 0;
//     } else {
//       tempObj[dateString] = commitsByDayObj[dateString];
//     }
//     returnList.push(tempObj);
//   });

//   return returnList.reverse();
// }

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
  } else if (request.action === CLOSE_POPUP) {
    window.close();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  setStorage(USER_ID, "");
  setStorage(COMMIT_COUNT, 0);
  setStorage(COMMITS_BY_DAY, {});
  chrome.action.setIcon({ path: DEMO_IMG_PAHT });
});
