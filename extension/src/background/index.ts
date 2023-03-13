console.log('Background script is running...');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onMessageHandler(message, sender, sendResponse) {
	switch (message.type) {
		case 'bglog':
			console.log(message.data);
			break;
	}
	return true;
}

chrome.runtime.onMessage.addListener(onMessageHandler);

export {};
