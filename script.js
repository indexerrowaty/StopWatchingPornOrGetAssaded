// Get the URL of the "Get Assaded" site
const punishmentURL = browser.runtime.getURL("assets/punishment.html");

// Define blacklist variable
var blacklist;

(async function() {
	// Get the blacklist
	blacklist = await import(browser.runtime.getURL("assets/blacklist.js"));
	blacklistSubReddit = await import(browser.runtime.getURL("assets/blacklistSubReddit.js"));
	blacklist = blacklist.default;
	blacklistSubReddit = blacklistSubReddit.default;

	// Listen for any changes to the tabs
	browser.tabs.onUpdated.addListener(function (tabID, changeInfo) {
		if (changeInfo.url) {
			// Get the domain of the visited website
			const domain = new URL(changeInfo.url).hostname.split('.').slice(-2).join(".");
			
			// Check whether the domain user visited is haram.
			// And if it is then redirect the user to punishment.
			if (blacklist.find((x) => domain === x))
				browser.tabs.update(tabID, {url: punishmentURL});

			if (domain=="reddit.com"){
				const sub= new URL(changeInfo.url).pathname.split('/')[2];
				if (blacklistSubReddit.find((x) => sub === x))
					browser.tabs.update(tabID, {url: punishmentURL});
			}
		}
	});
})();
