browser.browserAction.onClicked.addListener(function (tab) {

  chrome.tabs.sendMessage(tab.id, {content: "message"}, function(response) {
    console.log(response)
  });
})
