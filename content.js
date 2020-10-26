class deemix_dl_extension {

	downloadAlbum() {
		copyCommand("deemix -l " + window.location.href);
	}

	createAlbumButton() {
		let button = document.createElement("input");
		button.name = "dlAlbumButton"
		button.value = "Download Album";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByClassName("header-creator")[0].insertAdjacentElement(
			"afterend", button)
		button.addEventListener("click", this.downloadAlbum);

		//todo add download selected songs

	}

	createDownloadButton() {
		let button = document.createElement("input");
		button.value = "Download Selected";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByName("dlAlbumButton")[0].insertAdjacentElement(
			"afterend", button);
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

function copyCommand(text) {
	navigator.clipboard.writeText(text).then(() => {
	}, () => {});
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