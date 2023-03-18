const counter = document.getElementById("counter");
getStorage();
setIcons(Number(counter.innerHTML));

function incrementCount() {
  setStorage(Number(counter.innerHTML) + 1);
  getStorage();
  setIcons(Number(counter.innerHTML));
}

function clearCount() {
  setStorage(0);
  getStorage();

  document.getElementById("plantImg").src =
    "../assets/images/plant/plant00.png";
  chrome.action.setIcon({ path: "../assets/images/plant/plant00.png" });
}

function setStorage(data) {
  chrome.storage.local.set({ count: data });
}

function getStorage() {
  chrome.storage.local.get("count", function (result) {
    if (result.count) {
      counter.innerHTML = result.count;
    } else {
      counter.innerHTML = 0;
    }
  });
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

document
  .getElementById("counterBtn")
  .addEventListener("click", function (event) {
    incrementCount();
  });

document.getElementById("clearBtn").addEventListener("click", function (event) {
  clearCount();
});
