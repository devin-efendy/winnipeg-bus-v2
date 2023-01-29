console.log("Background script is running...");

function onMessageHandler(message, sender, sendResponse) {
  switch (message.type) {
    case "bglog":
      console.log(message.data);
      break;
  }
  return true;
}

chrome.runtime.onMessage.addListener(onMessageHandler)