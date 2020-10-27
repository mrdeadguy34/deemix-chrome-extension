function copyCommand(text) {
	navigator.clipboard.writeText(text).then(() => {
	}, () => {});
}

function downloadAlbum() {
		copyCommand("deemix -p ./ " + window.location.href);
		alert("Copied command to clipboard");
	}

function downloadFromObject(urlObject)  {
	let cmd = "deemix -p ./"
	for (let url in urlObject)
		cmd += " " + urlObject

	copyCommand(cmd);
	alert("Copied command to clipboard");
}

class deemix_dl_extension {

	downloadSelected() {
		downloadFromObject(this.selectedSongs);
	}

	createAlbumButton() {
		let button = document.createElement("input");
		button.name = "dlAlbumButton"
		button.value = "Download Album";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByClassName("header-creator")[0].insertAdjacentElement(
			"afterend", button)
		button.addEventListener("click", downloadAlbum);

	}

	createDownloadButton() {
		let button = document.createElement("input");
		button.value = "Download Selected";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByName("dlAlbumButton")[0].insertAdjacentElement(
			"afterend", button);
		button.addEventListener("click", this.downloadSelected);
	}

	addAlbum(checkbox) {
		let songElement = checkbox.parentElement.parentElement.parentElement.children[2]
		let songName = songElement.innerText;
		if (checkbox.checked) {

			let songUrl = songElement.children[0].children[0].href;

			this.selectedSongs[songName] = songUrl;
		} else {
			delete this.selectedSongs[songName];
		}


		console.log(this.selectedSongs);
	}


	constructor() {

		this.selectedSongs = {}

		this.createAlbumButton();
		this.createDownloadButton();
	}
}

function main() {
	var extension = new deemix_dl_extension();

	for (let checkbox of document.getElementsByClassName("checkbox-input")) {
		checkbox.addEventListener("change", function () {
			extension.addAlbum(checkbox);
		});
	}

}

var checkExist = setInterval(function() {
	if (document.getElementsByClassName("header-creator")[0]) {
		console.log("Running extension...");
		main()
		clearInterval(checkExist)
	}
}, 100)