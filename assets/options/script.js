const filterCheckbox = document.getElementById("builtInFilters");
const customFilterInput = document.getElementById("customFilters");
const filterCheck = /^(?!.*;;)(?!.*;{2,})([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(;[a-zA-Z0-9-]+\.[a-zA-Z]{2,})*$/;

// Get extension settings on page load
document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get().then(e => {
		filterCheckbox.checked = e.builtInFilters ?? true;
		customFilterInput.value = e.customFilters || "";
	});
});

// Toggle built-in filters
document.getElementById("toggleCheckbox").addEventListener("click", () => {
	chrome.storage.sync.set({
		builtInFilters: (
			filterCheckbox.checked = !filterCheckbox.checked
		),
	});
});

// Automatically check and save custom filters
customFilterInput.addEventListener('input', e => {
	if(!filterCheck.test(e.target.value) && e.target.value) return e.target.classList.add("invalid")
	e.target.classList.remove("invalid");
	chrome.storage.sync.set({
		customFilters: e.target.value.toLowerCase()
	});
})
