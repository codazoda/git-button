chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "git-button.js"});
});