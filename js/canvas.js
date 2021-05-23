const deltaTime = 0.016;

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
		this.ctx.fillRect(0, 0, this.dimensions.x, this.dimensions.y);
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
	//get width() {
	//	return this.dimensions.x;
	//}
	//get height() {
	//	return this.dimensions.y;
	//}
}

class Agent {
	constructor(limits) {
		this.limits = limits;
		this.xy = /*Vector2.range(Vector2.zero, limits)*/ new Vector2(CANVAS.dimensions.x / 2, CANVAS.dimensions.y / 2);
		this.angle = Vector2.random(1, -1);
	}
	move() {
		const t = this;
		const newPos = Vector2.add(t.xy, new Vector2(t.angle.x * agentSpeed * deltaTime, t.angle.y * agentSpeed * deltaTime));
		if (newPos.x < 0 || newPos.x > t.limits.x || newPos.y < 0 || newPos.y > t.limits.y) {
			t.xy = Vector2.clamp(t.xy, Vector2.zero, t.limits);
			t.angle = Vector2.random(1, -1);
		}
		else {
			t.xy = newPos;
		}
	}
}

let agents = [];
let agentColor = "white";
let agentSpeed = 100;
let trailDim = 0.02;
let agentSteerStrength = 8;

let quadrantsX = 30 * 1.7;
let quadrantsY = 27 * 1.7;
let quadrants = [];
let agentQuadrants = [];

const CANVAS = new Canvas("#canvas-output", 1000, 900, function(t){

	// trail effect
	t.ctx.fillStyle = "rgba(0, 0, 0, " + trailDim + ")";
	t.ctx.fillRect(0, 0, t.dimensions.x, t.dimensions.y);

	quadrants = [];
	agentQuadrants = [];

	const _optimizedX = 1 / (t.dimensions.x / quadrantsX);
	const _optimizedY = 1 / (t.dimensions.y / quadrantsY);

	for (let i = 0; i < agents.length; i++) {

		const oldPos = agents[i].xy;
		agents[i].move();
		const newPos = agents[i].xy,
			  quadrant = Math.floor(Math.floor(oldPos.y * _optimizedY) * quadrantsX + Math.floor(oldPos.x * _optimizedX));
		
		if (typeof quadrants[quadrant] == "undefined") quadrants[quadrant] = 0;
		quadrants[quadrant] += 1;
		agentQuadrants[i] = quadrant;

		if (oldPos.x != newPos.x || oldPos.y != newPos.y) {

			t.drawLine(oldPos, newPos, agentColor);

		}

	}

	for (let i = 0; i < agents.length; i++) {

		const angle = agents[i].angle,
			  quadrant = agentQuadrants[i];

		// Use agent angle to determine the 3 quadrants in front of him
		let adjacent = [quadrant - 1, quadrant + 1, quadrant - quadrantsX, quadrant + quadrantsX, quadrant - quadrantsX - 1, quadrant - quadrantsX + 1, quadrant + quadrantsX + 1, quadrant + quadrantsX - 1];
		
		let mostNumberOfAgents = 0,
			bestDirection = 0,
			indecision = [false, -1];

		for (let dir = 0; dir < adjacent.length; dir++) {
			const numberOfAgentsInCell = quadrants[adjacent[dir]];
			if (typeof numberOfAgentsInCell == "number" && numberOfAgentsInCell > mostNumberOfAgents) {
				mostNumberOfAgents = numberOfAgentsInCell;
				bestDirection = dir;
			}
			else if (numberOfAgentsInCell == mostNumberOfAgents) {
				indecision[0] = true;
				indecision[1] = numberOfAgentsInCell;
			}
		}

		if (mostNumberOfAgents != 0 && (!indecision[0] || indecision[1] != mostNumberOfAgents)) {

			let newAngle;

			switch(bestDirection) {
				case 0:
					newAngle = new Vector2(-agentSteerStrength, 0);
					break;
				case 1:
					newAngle  = new Vector2(agentSteerStrength, 0);
					break;
				case 2:
					newAngle  = new Vector2(0, -agentSteerStrength);
					break;
				case 3:
					newAngle  = new Vector2(0, agentSteerStrength);
					break;
				case 4:
					newAngle  = new Vector2(agentSteerStrength, -agentSteerStrength);
					break;
				case 5:
					newAngle  = new Vector2(-agentSteerStrength, -agentSteerStrength);
					break;
				case 6:
					newAngle  = new Vector2(agentSteerStrength, agentSteerStrength);
					break;
				case 7:
					newAngle  = new Vector2(-agentSteerStrength, agentSteerStrength);
					break;
			}

			const scalar = Vector2.multiply(Vector2.from_number(deltaTime), Vector2.random(0, 2));

			agents[i].angle = Vector2.add(angle, Vector2.multiply(newAngle, scalar));

		}

	}

});

for (let a = 0; a < 500; a++) {
	agents.push(new Agent(CANVAS.dimensions));
}