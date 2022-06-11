import { NodeWeb } from "./NodeWeb.js";
document.addEventListener("DOMContentLoaded", event => {
	var container = document.getElementById("header");
	canvas = document.createElement("canvas")
	canvas.style.width = "100%"
	canvas.style.height = "100%"
	canvas.id = "headertoy"
	container.appendChild(canvas)
	context = canvas.getContext('2d');

	window.addEventListener("resize", resize);
	container.addEventListener("touchmove", onTouchMove)
	container.addEventListener("mousemove", onMouseMove)

	init();
	animate();
});

var canvas;
var context;
var animId;

var web = new NodeWeb()

function init() {
	web.initialize()

	//resize
	resize()
}

function resize() {
	let dpi = window.devicePixelRatio;
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	context.width = canvas.clientWidth / dpi;
	context.height = canvas.clientHeight / dpi;
	web.resize()
}

function animate() {
	update();
	context.save();
	context.translate(0.5, 0.5);
	clearFrame(context);
	draw(context);
	context.restore();
	animId = requestAnimationFrame(animate, canvas);
}

function clearFrame(context) {
	context.fillStyle = "#000000";
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fill();
}

function update() {
	web.update()

}

function draw(context) {
	web.draw(context)
}

function onTouchMove(event) {
	let containingBounds = event.target.getBoundingClientRect()
	let cursorPosition = {x: event.touches[0].clientX - containingBounds.x, y: event.touches[0].clientY - containingBounds.y}
	web.onMouseMove(cursorPosition)
}

function onMouseMove(event) {
	let containingBounds = event.target.getBoundingClientRect()
	let cursorPosition = {x: event.clientX - containingBounds.x, y: event.clientY - containingBounds.y}
	web.onMouseMove(cursorPosition)
}