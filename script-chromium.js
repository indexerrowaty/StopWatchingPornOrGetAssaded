// Get the URL of the "Get Assaded" site
const punishmentURL = chrome.runtime.getURL("assets/punishment/punishment.html");

// Get built-in filter list
importScripts(chrome.runtime.getURL("assets/filterlist.js"));

// Get user preferences
var filters = [];
function loadUserPreferences() {
	filters = [];
	chrome.storage.sync.get().then(e => {
		if(e.customFilters) filters = filters.concat(e.customFilters.split(";"));
		if(e.builtInFilters !== false) filters = filters.concat(filterlist);
	})
}
chrome.storage.onChanged.addListener(loadUserPreferences);
loadUserPreferences();

// Listen for any changes to the tabs
chrome.tabs.onUpdated.addListener((tabID, changeInfo) => {
	if (changeInfo.url) {
		// Get the domain of the visited website
		const domain = new URL(changeInfo.url).hostname.split('.').slice(-2).join(".");

		// Check whether the domain user visited is haram.
		// And if it is then redirect the user to punishment.
		if (filters.find(x => domain === x))
			chrome.tabs.update(tabID, { url: punishmentURL });
	}
});