// Get the URL of the "Get Assaded" site
const punishmentURL = chrome.runtime.getURL("assets/punishment/punishment.html");

// Get built-in filter list
// Chrome only, because Firefox can't import scripts it seems. So we import in manifest.json
// If this changes, feel free to do a pull request.
if (typeof filterlist === 'undefined') importScripts(chrome.runtime.getURL("assets/filterlist.js"));

// Get user preferences
var filters = [];
function loadUserPreferences() {
	filters = [];
	chrome.storage.sync.get().then(e => {
		if (e.customFilters) filters = filters.concat(e.customFilters.split(";"));
		if (e.builtInFilters !== false) filters = filters.concat(filterlist);
	})
}
chrome.storage.onChanged.addListener(loadUserPreferences);
loadUserPreferences();

// Listen for any changes to the tabs
chrome.tabs.onUpdated.addListener((tabID, changeInfo) => {
	if (changeInfo.url) {
		// Get the domain of the visited website
		const domain = new URL(changeInfo.url).hostname;
		const tld = domain.split('.').slice(-2).join(".");

		// Check whether the domain user visited is haram.
		// And if it is then redirect the user to punishment.
		if (filters.includes(domain) || filters.includes(tld))
			chrome.tabs.update(tabID, { url: punishmentURL });
	}
});