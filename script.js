// Get the URL of the "Get Assaded" site
const punishmentURL = chrome.runtime.getURL("assets/punishment.html");

// Get the blacklist
importScripts(chrome.runtime.getURL("assets/blacklist.js"));

// Listen for any changes to the tabs
chrome.tabs.onUpdated.addListener((tabID, changeInfo) => {
	if (changeInfo.url) {
		// Get the domain of the visited website
		const domain = new URL(changeInfo.url).hostname.split('.').slice(-2).join(".");

		// Check whether the domain user visited is haram.
		// And if it is then redirect the user to punishment.
		if (self.blacklist.find(x => domain === x))
			chrome.tabs.update(tabID, { url: punishmentURL });
	}
});