async function getCommitCount(username) {
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
  // return commitCount;
  return { commitsByDay, commitCount };
}

async function setCommitCount(username) {
  const { commitsByDay, commitCount } = await getCommitCount(username);

  console.log("setCommitCount");
  setStorage("commitCount", commitCount);
  setStorage("commitsByDay", commitsByDay);
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

chrome.runtime.onInstalled.addListener(() => {
  // let color = "#3aa757";
  // chrome.storage.sync.set({ color });
  // console.log("Default background color set to %cgreen", `color: ${color}`);

  const username = "99mini";

  setCommitCount(username);
  getStorage("commitCount");
  getStorage("commitsByDay");
});
