const SPACING = 100;

const IMAGES = [
	"G3", "J1"
];

let coordinates = "";


function submitPressed() {
	const inputField = document.getElementById("captcha-input");
	const value = inputField.value;

	console.log(value);
	console.log(coordinates);

	if (value.toLowerCase() === coordinates.toLowerCase()) {
		alert("You are not a robot!");
	} else {
		alert("You are a robot!");
	}
}

document.addEventListener("DOMContentLoaded", function() {
	const image = document.getElementById("captcha-image");

	// pick a random image
	coordinates = IMAGES[Math.floor(Math.random() * IMAGES.length)];

	// set the image source
	image.src = `images/${coordinates}.png`;

	image.addEventListener("load", function() {
		console.log("image loaded");

		/* add gridlines to image */
		const canvas = document.createElement("canvas");
		canvas.id = "captcha-image";

		// set to size of image, not size of image element
		canvas.width = image.naturalWidth;
		canvas.height = image.naturalHeight;

		// then scale it down
		canvas.style.width = "100%";
		canvas.style.height = "100%";

		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		console.log(canvas.width, canvas.height);

		for (let x = 0; x < canvas.width + 1; x += SPACING) {
			console.log(x);
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}

		for (let y = 0; y < canvas.height + 1; y += SPACING) {
			console.log(y);
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}

		// add canvas to page, in place of image
		image.parentNode.insertBefore(canvas, image);
		image.parentNode.removeChild(image);
	});
});
