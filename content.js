var DL_URL = "http://127.0.0.1:8000/download/"

function downloadFromList(songsList)  {
	var http = new XMLHttpRequest();
	http.open("POST", DL_URL, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

	let params = {"songs": songsList}
	let urlEncodedData = "", urlEncodedDataPairs = [], name;
	for( name in params ) {
		urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(params[name]));
	}

	http.send(urlEncodedDataPairs);
}

class deemix_dl_extension {

	downloadSelected() {
		downloadFromList(this.selectedSongs);
	}

	createAlbumButton() {
		let button = document.createElement("input");
		button.name = "dlAlbumButton"
		button.value = "Download Album";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByClassName("header-creator")[0].insertAdjacentElement(
			"afterend", button)
		button.addEventListener("click", function() {
			downloadFromList([window.location.href])
		});

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

	addSong(checkbox) {
		let songElement = checkbox.parentElement.parentElement.parentElement.children[2]
		var songUrl = songElement.children[0].children[0].href;

		if (checkbox.checked) {
			this.selectedSongs.push(songUrl);
		} else {
			this.selectedSongs.pop(this.selectedSongs.indexOf(songUrl));
		}
	}


	constructor() {

		this.selectedSongs = []

		this.createAlbumButton();
		this.createDownloadButton();
	}
}

function main() {
	var extension = new deemix_dl_extension();

	for (let checkbox of document.getElementsByClassName("checkbox-input")) {
		checkbox.addEventListener("change", function () {
			extension.addSong(checkbox);
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