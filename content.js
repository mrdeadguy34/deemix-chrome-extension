function downloadAlbum() {

}

function createButton() {
	let button = document.createElement("input");
	button.addEventListener("onclick", downloadAlbum);
	button.value = "Download Album";
	button.type = "button"
	button.className = "root-0-3-1 containedPrimary-0-3-9";
	document.getElementsByClassName("header-creator")[0].insertAdjacentElement(
		"afterend", button)

}

var checkExist = setInterval(function() {
	if (document.getElementsByClassName("header-creator")[0]) {
		console.log("Running button creation...");
		createButton()
		clearInterval(checkExist)
	}
}, 100)