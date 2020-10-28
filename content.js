const DL_URL = "https://deemix-dl.herokuapp.com/download/"
const POPUP_HTML = `
<div class="deemix_dl_container_pop_up deemix_dl_hide_pop_up">
	<div class="deemix_dl_pop_up">
		<a class="deemix_dl_pop_up_close_a" href="javascript:void(0)" onclick="this.parentElement.className += 'deemix_dl_hide_pop_up'">&#x2716</a>
		<h1>Your selected files are being downloaded!</h1>
		<h3>
			These files make take a while to download please do not leave this page.
		</h3>
		<h1 class="deemix_dl_error_message"></h1>
		<div class="deemix_dl_pop_up_bottom_text">
			This pop up will automatically close when the files have been downloaded.
		</div>
	</div>
</div>
`

function downloadFromList(songsList) {
	let data = {"songs": songsList}
	let reqData = {
		method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
		body: JSON.stringify(data)
	}

	showPopUp();
	fetch(DL_URL, reqData)
	.then(res => res.blob() )
	.then(blob => {
		let a = document.createElement("a");
		var file = window.URL.createObjectURL(blob);
		a.href = file;
		a.download = "songs.zip";
		a.click();
		closePopUp();
	}).catch(err => {
		document.getElementsByClassName("deemix_dl_error_message")[0].innerHTML = err;
		showPopUp();
	});
}

function showPopUp() {
		document.getElementsByClassName("deemix_dl_container_pop_up")[0].className = "deemix_dl_container_pop_up"

}

function closePopUp() {
	document.getElementsByClassName("deemix_dl_container_pop_up")[0].className += " deemix_dl_hide_pop_up"
}

function createPopUp() {
	document.body.insertAdjacentHTML("afterbegin", POPUP_HTML)
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
		button.addEventListener("click", ev => this.downloadSelected(ev.srcElement));
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

	createPopUp();

	for (let checkbox of document.getElementsByClassName("checkbox-input")) {
		checkbox.addEventListener("change", ev => extension.addSong(checkbox));
	}

}

var checkExist = setInterval(function() {
	if (document.getElementsByClassName("header-creator")[0]) {
		console.log("Running extension...");
		main()
		clearInterval(checkExist)
	}
}, 100)