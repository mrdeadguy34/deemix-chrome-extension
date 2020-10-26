function copyCommand(text) {
	navigator.clipboard.writeText(text).then(() => {
	}, () => {});
}

function downloadAlbum() {
	copyCommand("deemix -l " + window.location.href);
}

function createButton() {
	let button = document.createElement("input");
	button.value = "Download Album";
	button.type = "button"
	button.className = "root-0-3-1 containedPrimary-0-3-9";
	document.getElementsByClassName("header-creator")[0].insertAdjacentElement(
		"afterend", button)
	button.addEventListener("click", downloadAlbum);

	//todo add download selected songs

}

var checkExist = setInterval(function() {
	if (document.getElementsByClassName("header-creator")[0]) {
		console.log("Running button creation...");
		createButton()
		clearInterval(checkExist)
	}
}, 100)