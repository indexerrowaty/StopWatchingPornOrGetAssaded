// Get the URL of the "Get Assaded" site
const punishmentURL = browser.runtime.getURL("assets/punishment.html");

// Define blacklist variable
var blacklist;

(async function() {
	// Get the blacklist
	blacklist = await import(browser.runtime.getURL("assets/blacklist.js"));
	blacklist = blacklist.default;

	// Listen for any changes to the tabs
	browser.tabs.onUpdated.addListener(function (tabID, changeInfo) {
		if (changeInfo.url) {
			// Get the domain of the visited website
			const domain = new URL(changeInfo.url).hostname.split('.').slice(-2).join(".");
			
			// Check whether the domain user visited is haram.
			// And if it is then redirect the user to punishment.
			if (blacklist.find((x) => domain === x))
				browser.tabs.update(tabID, {url: punishmentURL});
		}
	});
})();