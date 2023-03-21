// loading DOM
const helloUserA = document.getElementById("hello-user-a");
const dateListContainer = document.getElementById("date-list-container");
const counter = document.getElementById("counter");
const mainSetcionElement = document.getElementById("main-section");
const setUserIdSetcionElement = document.getElementById("set-userId-section");

// constant
const MAIN = "main";
const SET_USER_ID = "set-userId";

// chrome local storage key
const USER_ID = "userId";
const COMMIT_COUNT = "commitCount";
const COMMITS_BY_DAY = "commitsByDay";

// background action name
const REFRESH_ACTION = "refreshAction";

let loading = false;

let commitCount = 0;
let commitsByDay = {};

init();

/**
 *
 */
async function init() {
  // get chrome local storage
  refresh();
  togglePopupMenu(MAIN);
  let userId = await getStorage(USER_ID);
  setStorage(USER_ID, userId);
  displayUserId(userId);

  // 클릭이벤트 만들기
  document
    .getElementById("set-userId-btn")
    .addEventListener("click", function (event) {
      togglePopupMenu(SET_USER_ID);
      // setUserId();
    });

  document
    .getElementById("refresh-btn")
    .addEventListener("click", function (event) {
      refresh();
    });

  document
    .getElementById("back-btn")
    .addEventListener("click", function (event) {
      togglePopupMenu(MAIN);
    });

  setHandleSubmit("userId-input", "userId-submit-btn", USER_ID);

  loading = true;
}

/**
 *
 * @param {*} inputElementId
 * @param {*} btnElementId
 * @param {*} storageKey
 *
 */
function setHandleSubmit(inputElementId, btnElementId, storageKey) {
  const btnElement = document.getElementById(btnElementId);

  btnElement.onclick = () => {
    setStorage(storageKey, document.getElementById(inputElementId).value);
    togglePopupMenu(MAIN);

    refresh();
  };
}

/**
 *
 * @param {string} mode
 */
function togglePopupMenu(mode) {
  switch (mode) {
    case MAIN:
      mainSetcionElement.style.display = "flex";
      setUserIdSetcionElement.style.display = "none";
      break;
    case SET_USER_ID:
      mainSetcionElement.style.display = "none";
      setUserIdSetcionElement.style.display = "flex";
      break;
    default:
      break;
  }
}

/**
 *
 * @param {*} userId
 */
function displayUserId(userId) {
  helloUserA.innerHTML = "안녕, @" + userId;
  helloUserA.href = "https://github.com/" + userId;
}

/**
 * call github api and set commit info and set innerHTML
 */
async function refresh() {
  // 만약 첫 번째로딩이 아니면 백그라운드에서 api 호출을 한다.
  if (loading) {
    await callBackgroundFunc(REFRESH_ACTION);
  }
  // set total commitCount
  commitCount = await getStorage(COMMIT_COUNT);
  counter.innerHTML = commitCount;

  // set commitsByDay
  commitsByDay = await getStorage(COMMITS_BY_DAY);

  if (!dateListContainer.hasChildNodes()) {
    dateListContainer.appendChild(generateList(commitsByDay, null, null));
  } else {
    // TODO dateListContainer의 데이터 업데이트하기
    updateDateList(commitsByDay);
  }
  // set Icons
  setIcons(Number(counter.innerHTML));
}

/**
 *
 * @param {*} key
 * @param {*} value
 */
function setStorage(key, value) {
  const setObj = {};
  setObj[key] = value;
  chrome.storage.local.set(setObj);
}

/**
 *
 * @param {*} key
 * @returns
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

/**
 *
 * @param {*} number
 */
function setIcons(number) {
  if (number < 5) {
    document.getElementById("plant-img").src =
      "../assets/images/plant/plant00.png";
    chrome.action.setIcon({ path: "../assets/images/plant/plant00.png" });
  }
  if (number >= 5) {
    document.getElementById("plant-img").src =
      "../assets/images/plant/plant16.png";
    chrome.action.setIcon({ path: "../assets/images/plant/plant16.png" });
  }
}

/**
 *
 * @param {Array} data
 * @param {HTMLElement} parentList
 * @param {HTMLElement} parentItem
 * @returns {HTMLElement} li list
 */
function generateList(data, parentList, parentItem) {
  // TODO 이미 리스트가 있는 경우 리스트를 만들지 말고 데이터만 업데이트하기

  let list = parentList || document.getElementById("date-item-list");
  if (!list) {
    list = document.createElement("ul");
    list.id = "date-item-list";
  }

  for (let key in data) {
    let item = document.createElement("li");
    item.className = "date-item";

    if (typeof data[key] === "object") {
      generateList(data[key], list, item);
    } else {
      if (item.hasChildNodes()) {
        item.innerHTML(key + " - " + data[key]);
      } else {
        item.appendChild(document.createTextNode(key));
        item.appendChild(document.createTextNode(" - " + data[key]));
      }
    }
    if (parentItem) {
      list.appendChild(item);
    }
  }
  if (!parentList && !parentItem) {
    return list;
  }
}

function updateDateList(dateList) {
  const itemList = document.getElementsByClassName("date-item");
  for (let index = 0; index < dateList.length; index++) {
    const element = itemList[index];

    const key = Object.keys(dateList[index]).toString();
    const value = Object.values(dateList[index]).toString();

    element.innerHTML = key + " - " + value;
  }
  console.log("updateCommitsByDay");
}

/**
 *
 * @param {*} actoinName
 */
async function callBackgroundFunc(actoinName) {
  await chrome.runtime.sendMessage({ action: actoinName }, function (response) {
    console.log("Background function called from popup");
  });
  console.log("end background.js call");
}
