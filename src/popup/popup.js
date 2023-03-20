// loading DOM
const container = document.getElementById("list-container");
const counter = document.getElementById("counter");

let commitCount = 0;
let commitsByDay = {};

function incrementCount() {
  setStorage("count", Number(counter.innerHTML) + 1);
  getStorage("commitCount");
  setIcons(Number(counter.innerHTML));
}

async function refresh() {
  // set total commitCount
  commitCount = await getStorage("commitCount");
  counter.innerHTML = commitCount;

  // set commitsByDay
  commitsByDay = await getStorage("commitsByDay");
  container.appendChild(generateList(commitsByDay));

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
    document.getElementById("plantImg").src =
      "../assets/images/plant/plant00.png";
    chrome.action.setIcon({ path: "../assets/images/plant/plant00.png" });
  }
  if (number >= 5) {
    document.getElementById("plantImg").src =
      "../assets/images/plant/plant16.png";
    chrome.action.setIcon({ path: "../assets/images/plant/plant16.png" });
  }
}

// 커밋 리스트 디스플레이
function generateList(data) {
  let list = document.createElement("ul");
  for (let key in data) {
    let item = document.createElement("li");
    item.appendChild(document.createTextNode(key));
    if (typeof data[key] === "object") {
      item.appendChild(generateList(data[key]));
    } else {
      item.appendChild(document.createTextNode(": " + data[key]));
    }
    list.appendChild(item);
  }
  return list;
}

// 클릭이벤트 만들기
document
  .getElementById("counterBtn")
  .addEventListener("click", function (event) {
    incrementCount();
    console.log(getStorage("commitsByDay"));
  });

document
  .getElementById("refreshBtn")
  .addEventListener("click", function (event) {
    refresh();
  });

// get chrome local storage
refresh();
