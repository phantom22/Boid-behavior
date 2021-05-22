const deltaTime = 1000 / 60;

// TODO, saveImage is too expensive
class Canvas {
	constructor(query, width, height, callback) {
		const canvas = document.querySelector(query);
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width;
		canvas.style.height = height;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.callback = callback;

		//this.frameChanges = false;
		//this.frameCounter = 0;

		this.dimensions = new Vector2(width, height);

		//this.clear();
		//this.saveImage();

		this.drawLoop();

	}
	draw() {
		//const t = this;
		this.callback(this);
		//if (t.frameChanges) {
		//	t.ctx.putImageData(t.image, 0, 0);
		//	t.frameChanges = false;
		//}
	}
	clear() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
	drawLine(start, end, color) {
		const ctx = this.ctx;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}
	drawLoop() {
		this.draw();
		//this.frameCounter++;
		// every 100 ms
		//if (this.frameCounter % 6 == 0) {
		//	this.frameCounter = 0;
		//	this.saveImage();
		//}
		requestAnimationFrame(this.drawLoop.bind(this));
	}
	//getPixel(pixel) {
	//	const index = pixel * 4;
	//	return this.image.data.slice(index, index + 4);
	//}
	//setPixel(pixel, rgba) {
	//	const index = pixel * 4;
	//	this.image.data[index] = rgba[0]
	//	this.image.data[index + 1] = rgba[1];
	//	this.image.data[index + 2] = rgba[2];
	//	this.image.data[index + 3] = rgba[3];
	//	this.frameChanges = true;
	//}
	//saveImage() {
	//	this.image = this.ctx.getImageData(0, 0, this.width, this.height);
	//}
	get width() {
		return this.dimensions.x;
	}
	get height() {
		return this.dimensions.y;
	}
}

class Agent {
	constructor(limits) {
		this.limits = limits;
		this.xy = Vector2.range(limits);
		this.angle = Vector2.random(1, -1);
		this.speed = 0.4;
	}
	move() {
		const t = this;
		const newPos = Vector2.add(t.xy, new Vector2(t.ax * t.speed * deltaTime, t.ay * t.speed * deltaTime));
		if (newPos.x < 0 || newPos.x > t.limits.x || newPos.y < 0 || newPos.y > t.limits.y) {
			t.xy = Vector2.clamp(t.xy, Vector2.zero, t.limits);
			t.angle = Vector2.random(1, -1);
		}
		else {
			t.xy = newPos;
		}
	}
	get x() {
		return this.xy.x;
	}
	set x(v) {
		this.xy.x = v;
	}
	get y() {
		return this.xy.y;
	}
	set y(v) {
		this.xy.y = v;
	}
	get ax() {
		return this.angle.x;
	}
	set ax(v) {
		this.angle.x = v;
	}
	get ay() {
		return this.angle.y;
	}
	set ay(v) {
		this.angle.y = v;
	}
	get pos() {
		return [Math.floor(this.x), Math.floor(this.y)];
	}
}

let agents = [];
let trailDim = 0.3;

const CANVAS = new Canvas("#canvas-output", 1000, 800, function(t){

	// trail effect
	t.ctx.fillStyle = "rgba(0, 0, 0, " + trailDim + ")";
	t.ctx.fillRect(0, 0, t.width, t.height);

	for (let i = 0; i < agents.length; i++) {

		const agent = agents[i];
		const oldPos = agent.xy;
		agent.move();
		const newPos = agent.xy;

		if (oldPos.x != newPos.x || oldPos.y != newPos.y) {

			t.drawLine(oldPos, newPos, 'white');

		}

	}

});

for (let a = 0; a < 500; a++) {
	agents.push(new Agent(CANVAS.dimensions));
}
