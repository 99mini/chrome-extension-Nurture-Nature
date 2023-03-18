const counter = document.getElementById("counter");
getStorage();

function incrementCount() {
  chrome.storage.local.set({ count: Number(counter.innerHTML) + 1 });
  getStorage();
}

function getStorage() {
  chrome.storage.local.get("count", function (result) {
    if (result.count) {
      counter.innerHTML = result.count;
    }
  });
}

document
  .getElementById("counterBtn")
  .addEventListener("click", function (event) {
    incrementCount();
  });
