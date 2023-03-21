// loading DOM
const listContainer = document.getElementById("list-container");
const counter = document.getElementById("counter");
let loading = false;

let commitCount = 0;
let commitsByDay = {};

function incrementCount() {
  setStorage("count", Number(counter.innerHTML) + 1);
  getStorage("commitCount");
  setIcons(Number(counter.innerHTML));
}

async function refresh() {
  if (loading) {
    await callBackgroundFunc("refreshAction");
  }
  // set total commitCount
  commitCount = await getStorage("commitCount");
  counter.innerHTML = commitCount;

  // set commitsByDay
  commitsByDay = await getStorage("commitsByDay");

  if (!listContainer.hasChildNodes()) {
    listContainer.appendChild(generateList(commitsByDay, null, null));
  } else {
    // TODO listContainer의 데이터 업데이트하기
    updateDateList(commitsByDay);
  }
  // set Icons
  setIcons(Number(counter.innerHTML));
}

function setStorage(key, value) {
  const setObj = {};
  setObj[key] = value;
  chrome.storage.local.set(setObj);
}

async function getStorage(key) {
  let newPromise = new Promise(function (resolve, reject) {
    chrome.storage.local.get(key, function (result) {
      resolve(result[key]);
    });
  });
  let result = await newPromise;
  return result;
}

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

// 클릭이벤트 만들기
document
  .getElementById("counter-btn")
  .addEventListener("click", function (event) {
    incrementCount();
  });

document
  .getElementById("refresh-btn")
  .addEventListener("click", function (event) {
    refresh();
  });

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

// get chrome local storage
refresh();
loading = true;
