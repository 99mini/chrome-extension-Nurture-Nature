// TODO userid가 undefined일 때 표현하기
// loading DOM
const helloUserA = document.getElementById("hello-user-a");
const dateListContainer = document.getElementById("date-list-container");
const counter = document.getElementById("counter");
const mainSetcionElement = document.getElementById("main-section");
const setUserIdSetcionElement = document.getElementById("set-userId-section");

const DOM_LIST = [
  helloUserA,
  dateListContainer,
  counter,
  mainSetcionElement,
  setUserIdSetcionElement,
];

// scg path
const LEAF00_SVG_PAHT = "../assets/svgs/leaf/leaf00.svg";
const LEAF01_SVG_PAHT = "../assets/svgs/leaf/leaf01.svg";
const LEAF02_SVG_PAHT = "../assets/svgs/leaf/leaf02.svg";
const LEAF03_SVG_PAHT = "../assets/svgs/leaf/leaf03.svg";
const LEAF04_SVG_PAHT = "../assets/svgs/leaf/leaf04.svg";

// page
const MAIN = "main";
const SET_USER_ID = "set-userId";

// chrome local storage key
const USER_ID = "userId";
const COMMIT_COUNT = "commitCount";
const COMMITS_BY_DAY = "commitsByDay";

// background action name
const REFRESH_ACTION = "refreshAction";

// 잎사귀 그림 0 3 6 10
const NO_COMMIT = 0;
const FIRST_COMMIT = 3;
const SECCOND_COMMIT = 6;
const THRID_COMMIT = 10;

let loading = false;

let userId = "";

init();

async function init() {
  if (DOM_LIST.includes(null)) return;
  // console.log("init call...!");
  // get chrome local storage
  loading = false;
  togglePopupMenu(MAIN);
  loading = await refresh();

  // 클릭 이벤트 만들기
  document
    .getElementById("set-userId-btn")
    .addEventListener("click", function (event) {
      togglePopupMenu(SET_USER_ID);
    });

  document
    .getElementById("refresh-btn")
    .addEventListener("click", async function (event) {
      const loading = await refresh();
    });

  document
    .getElementById("back-btn")
    .addEventListener("click", function (event) {
      togglePopupMenu(MAIN);
    });
  document
    .getElementById("close-btn")
    .addEventListener("click", function (event) {
      window.close();
    });

  setHandleSubmit("userId-input", "userId-submit-btn", USER_ID);
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
  let result = newPromise;
  return result;
}

/**
 *
 * @param {*} inputElementId
 * @param {*} btnElementId
 * @param {*} storageKey
 *
 */
async function setHandleSubmit(inputElementId, btnElementId, storageKey) {
  const btnElement = document.getElementById(btnElementId);
  const inputEl = document.getElementById(inputElementId);

  const defaultPlaceholder = await getStorage(storageKey);
  inputEl.placeholder = defaultPlaceholder;

  btnElement.onclick = async () => {
    const inputContent = inputEl.value;
    // console.log(inputContent);

    if (inputContent.length !== 0) {
      setStorage(storageKey, inputContent);
      const reLoading = await refresh();

      inputEl.value = "";
      window.close();
    }
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
  let titleText = "";
  let url = "";
  if (userId === "") {
    titleText = "안녕 깃헙 식집사, 아이디 설정을 하세요.";
    helloUserA.addEventListener("click", () => togglePopupMenu(SET_USER_ID));
  } else {
    titleText = "안녕 깃헙 식집사, @" + userId;
    url += "https://github.com/" + userId;
    helloUserA.href = url;
  }
  helloUserA.innerHTML = titleText;
}

/**
 * call github api and set commit info and set innerHTML
 */
async function refresh() {
  // if (loading) {
  const endBgFunc = await callBackgroundFunc(REFRESH_ACTION);

  // }
  // set total commitCount
  const commitCount = await getStorage(COMMIT_COUNT);
  counter.innerHTML = commitCount;

  // set commitsByDay
  const commitsByDay = await getStorage(COMMITS_BY_DAY);

  if (!dateListContainer.hasChildNodes()) {
    dateListContainer.appendChild(generateList(commitsByDay, null, null));
  } else {
    updateDateList(commitsByDay);
  }

  // display userID
  const userId = await getStorage(USER_ID);
  displayUserId(userId);

  return true;
}

/**
 *
 * @param {{}} data
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
      var img = setDateItem(Number(data[key]), item);
      img.id = key;

      if (item.hasChildNodes()) {
        item.createTextNode(key + " - ");
        item.appendChild(img);
        item.createTextNode(data[key]);
      } else {
        item.appendChild(document.createTextNode(key + " - "));
        item.appendChild(img);
        item.appendChild(document.createTextNode(data[key]));
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

/**
 *
 * @param {number} count
 * @param {HTMLElement} item
 * @returns {HTMLImageElement} img
 */
function setDateItem(count, item) {
  var img = new Image();
  img.classList.add("commit-img");
  if (count === NO_COMMIT) {
    item.classList.add("off-count");
    img.src = LEAF00_SVG_PAHT;
    img.alt = "leaf00 svg";
  } else {
    item.classList.add("on-count");
    if (count < FIRST_COMMIT) {
      img.src = LEAF01_SVG_PAHT;
      img.alt = "leaf01 svg";
    } else if (count < SECCOND_COMMIT) {
      img.src = LEAF02_SVG_PAHT;
      img.alt = "leaf02 svg";
    } else if (count < THRID_COMMIT) {
      img.src = LEAF03_SVG_PAHT;
      img.alt = "leaf03 svg";
    } else {
      img.src = LEAF04_SVG_PAHT;
      img.alt = "leaf04 svg";
    }
  }

  return img;
}

/**
 *
 * @param {*} dateList
 */
function updateDateList(dateList) {
  const itemList = document.getElementsByClassName("date-item");
  for (let index = 0; index < dateList.length; index++) {
    const element = itemList[index];

    const key = Object.keys(dateList[index]).toString();
    const value = Object.values(dateList[index]).toString();
    const img = setDateItem(Number(value), element);

    element.createTextNode(key + " - ");
    element.appendChild(img);
    element.createTextNode(data[key]);
  }
  // console.log("updateCommitsByDay");
}

/**
 *
 * @param {*} actoinName
 */
async function callBackgroundFunc(actoinName) {
  const loading = await chrome.runtime.sendMessage(
    { action: actoinName },
    function (response) {
      // console.log("Background function called from popup");
      return true;
    }
  );
  return loading;
  // console.log("end background.js call");
}
