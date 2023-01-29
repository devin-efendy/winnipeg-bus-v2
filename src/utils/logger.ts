const logger = function (obj) {
	if (chrome && chrome.runtime) {
		chrome.runtime.sendMessage({ type: 'bglog', data: obj });
	}
	console.log(obj);
};

export default logger;
