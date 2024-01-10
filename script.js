(async function() {
    const blacklistImp = await import(browser.extension.getURL("assets/blacklist.js"));
    const blacklist = blacklistImp.default;
    const domain = new URL(document.URL).hostname.split('.').slice(-2).join(".");

    if (blacklist.find((x) => domain === x)) {

    	let videoURL = browser.extension.getURL("assets/assad.mp4")
        console.log(
        	"%cHARAM! HARAM! HARAM! HARAM! HARAM!",
        	"color: red; font-size: 25px;"
        )
        // Remove scripts and stylesheets from head
        Array.from(document.head.children).forEach(x=>document.head.removeChild(x))
        document.title = "STAPH WATCHING PORN!!! HARAM!!!!!!"

        // Setup body
        document.body.style.backgroundColor = "#000"
        document.body.style.overflow = "hidden"
        document.body.style.margin="0"
        document.body.innerHTML = `<video loop src="${videoURL}">`

        // Play the video lol
        let v =document.querySelector('video')
        v.style.width="100vw"
        v.style.height="100vh"
        v.play()

    }
})();
