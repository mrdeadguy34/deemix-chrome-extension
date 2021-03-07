const DL_URL = "http://127.0.0.1:8000/download/"
const POPUP_HTML = `
<div class="deemix_dl_container_pop_up deemix_dl_hide_pop_up">
	<div class="deemix_dl_pop_up">
		<a class="deemix_dl_pop_up_close_a" href="javascript:void(0)" onclick="this.parentElement.parentElement.className += ' deemix_dl_hide_pop_up'">&#x2716</a>
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

//TODO ADD VERSION CHECKING

class deemix_dl_extension {

	static downloadFromList(songsList) {
		let data = {"songs": songsList}
		let reqData = {
			method: "POST",
	        headers: {
	          'Content-Type': 'application/json'
	        },
			body: JSON.stringify(data)
		}

		deemix_dl_extension.showPopUp();
		fetch(DL_URL, reqData)
		.then(res => res.blob() )
		.then(blob => {
			let a = document.createElement("a");
			var file = window.URL.createObjectURL(blob);
			a.href = file;
			a.download = "songs.zip";
			a.click();
			deemix_dl_extension.closePopUp();
		}).catch(err => {
			document.getElementsByClassName("deemix_dl_error_message")[0].innerHTML = err;
			deemix_dl_extension.showPopUp();
		});
	}

	static showPopUp() {
			document.getElementsByClassName("deemix_dl_container_pop_up")[0].className = "deemix_dl_container_pop_up"

	}

	static closePopUp() {
		document.getElementsByClassName("deemix_dl_container_pop_up")[0].className += " deemix_dl_hide_pop_up"
	}

	static createPopUp() {
		document.body.insertAdjacentHTML("afterbegin", POPUP_HTML)
	}

	createAlbumButton() {
		let button = document.createElement("input");
		button.name = "dlAlbumButton"
		button.value = "Download Album";
		button.type = "button"
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByClassName("_2kEwD")[0].insertAdjacentElement(
			"afterend", button)
		button.addEventListener("click", function() {
			deemix_dl_extension.downloadFromList([window.location.href])
		});

	}

	createDownloadButton() {
		let button = document.createElement("input");
		button.value = "Download Selected";
		button.type = "button";
		button.className = "root-0-3-1 containedPrimary-0-3-9 deemix_dl_button";
		document.getElementsByName("dlAlbumButton")[0].insertAdjacentElement(
			"afterend", button);
		button.addEventListener("click", ev => deemix_dl_extension.downloadFromList(this.selectedSongs));
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

	deemix_dl_extension.createPopUp();

	for (let checkbox of document.getElementsByClassName("checkbox-input")) {
		checkbox.addEventListener("change", ev => extension.addSong(checkbox));
	}

}

var checkExist = setInterval(function() {
	if (document.getElementsByClassName("datagrid-header")[0]) {
		console.log("Running extension...");
		main();
		clearInterval(checkExist);
	}
}, 100)