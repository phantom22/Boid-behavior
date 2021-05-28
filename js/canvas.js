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

		this.dimensions = new Vector2(width, height);

		this.drawLoop();

	}
	draw() {
		this.callback(this);
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
		requestAnimationFrame(this.drawLoop.bind(this));
	}

}

class Agent {
	constructor(limits, color) {
		this.limits = limits;
		this.xy = new Vector2(limits.x / 2, 0); //Vector2.range(new Vector2(CANVAS.dimensions.x / 5 * 2 , CANVAS.dimensions.y / 5 * 2), new Vector2(CANVAS.dimensions.x / 5 * 3 , CANVAS.dimensions.y / 5 * 3));
		this.angle = new Vector2(0, 1);//Vector2.random(-1, 1);
		this.colors = ["lightcoral", "white", "black"];
		this.color = this.colors[Math.floor(Math.random() * 8)];
	}
	move() {
		const t = this;
		const newPos = Vector2.add(t.xy, new Vector2(t.angle.x * agentSpeed * deltaTime, t.angle.y * agentSpeed * deltaTime));
		if (newPos.x < 0 || newPos.x > t.limits.x || newPos.y < 0 || newPos.y > t.limits.y) {
			t.xy = Vector2.clamp(t.xy, Vector2.zero, t.limits);
			t.angle = Vector2.random(-1, 1);
			let index = t.colors.indexOf(t.color);
			index = index + 1 === t.colors.length ? 0 : index + 1;
			t.color = t.colors[index];
		}
		else {
			t.xy = newPos;
		}
	}
	getDirection(_all) {
		const degrees = Vector2.angle_from_origin(this.angle);

		let direction,
			adjacent;

		// H A
		if (degrees > 292.5 && degrees <= 337.5) {
			direction = 0;
			adjacent = [_all[7], ..._all.slice(0,2)];
		}
		// A B
		else if (degrees > 337.5 || degrees <= 22.5) {
			direction = 1;
			adjacent = _all.slice(0, 3);
		}
		// B C
		else if (degrees > 22.5 && degrees <= 67.5) {
			direction = 2;
			adjacent = _all.slice(1, 4);
		}
		// C D
		else if (degrees > 67.5 && degrees <= 112.5) {
			direction = 3;
			adjacent = _all.slice(2, 5);
		}
		// D E
		else if (degrees > 112.5 && degrees <= 157.5) {
			direction = 4;
			adjacent = _all.slice(3, 6);
		}
		// E F
		else if (degrees > 157.5 && degrees <= 202.5) {
			direction = 5;
			adjacent = _all.slice(4, 7);
		}
		// F G
		else if (degrees > 202.5 && degrees <= 247.5) {
			direction = 6;
			adjacent = _all.slice(5);
		}
		// G H
		else if (degrees > 247.5 && degrees <= 292.5) {
			direction = 7;
			adjacent = [..._all.slice(6), _all[0]];
		}

		let mostNumberOfAgents = 0,
			bestDirection;

		for (let dir = 0; dir < adjacent.length; dir++) {
			const numberOfAgentsInCell = quadrants[adjacent[dir]];
			if (typeof numberOfAgentsInCell == "number" && numberOfAgentsInCell > mostNumberOfAgents) {
				mostNumberOfAgents = numberOfAgentsInCell;
				bestDirection =  direction + dir - 1;
			}
		}

		bestDirection = bestDirection === -1 ? 7 : bestDirection;
		bestDirection = bestDirection === 8 ? 0 : bestDirection;

		return { direction, bestDirection }
	}

}
/**
 * @param  {number} direction
 * @param  {number} bestDirection
 * @return {Vector2}
 */
function getNewDirection(direction, bestDirection) {
	let newAngle;
	let sign;

	if (direction + bestDirection === 7) {
		sign = bestDirection === 7 ? 1 : -1;
	}
	else {
		sign = bestDirection < direction ? 1 : -1;
	}

	switch (bestDirection) {
		case 0:
			newAngle = [agentTurnRate, -agentTurnRate * 0.4];
			break;
		case 1:
			newAngle = [agentTurnRate, agentTurnRate * 0.4];
			break;
		case 2:
			newAngle = [agentTurnRate * 0.4, agentTurnRate];
			break;
		case 3:
			newAngle = [-agentTurnRate * 0.4, agentTurnRate];
			break;
		case 4:
			newAngle = [-agentTurnRate, agentTurnRate * 0.4];
			break;
		case 5:
			newAngle = [-agentTurnRate, -agentTurnRate * 0.4];
			break;
		case 6:
			newAngle = [-agentTurnRate * 0.4, -agentTurnRate];
			break;
		case 7:
			newAngle = [agentTurnRate * 0.4, -agentTurnRate];
			break;
		default:
			newAngle = [0, 0];
			break;
	}
	return new Vector2(newAngle[0] * sign, newAngle[1] * sign);
}

let agents = [];
let quadrants = [];
let agentQuadrants = [];

let agentColor = "white";
let agentSpeed = 200;
let agentTurnRate = 30;
let quadrantSize = 5; // in pixels
let quadrantOffset = 2;
let trailDim = 0.05;

/** @const {Canvas} */
const CANVAS = new Canvas("#canvas-output", 1200, 700, function(t){

	let quadrantsX = t.dimensions.x / quadrantSize;
	let quadrantsY = t.dimensions.y / quadrantSize;

	// trail effect
	t.ctx.fillStyle = "rgba(0, 0, 0, " + trailDim + ")";
	t.ctx.fillRect(0, 0, t.dimensions.x, t.dimensions.y);

	quadrants = [];
	agentQuadrants = [];

	const _optimizedX = 1 / (t.dimensions.x / quadrantsX),
		  _optimizedY = 1 / (t.dimensions.y / quadrantsY);

	for (let i = 0; i < agents.length; i++) {

		const oldPos = agents[i].xy;
		agents[i].move();
		const newPos = agents[i].xy,
			  quadrant = Math.floor(Math.floor(oldPos.y * _optimizedY) * quadrantsX + Math.floor(oldPos.x * _optimizedX));
		
		if (typeof quadrants[quadrant] == "undefined") quadrants[quadrant] = 0;
		quadrants[quadrant] += 1;
		agentQuadrants[i] = quadrant;

		if (oldPos.x != newPos.x || oldPos.y != newPos.y) {

			t.drawLine(oldPos, newPos, agents[i].color);

		}

	}

	for (let i = 0; i < agents.length; i++) {

		const quadrant = agentQuadrants[i],
			  _all = [
			  	quadrantOffset + quadrant + quadrantsX * quadrantOffset + quadrantOffset, 
			  	quadrantOffset + quadrant + quadrantsX * quadrantOffset, 
			  	quadrantOffset + quadrant + quadrantsX * quadrantOffset - quadrantOffset, 
			  	quadrantOffset + quadrant - quadrantOffset, 
			  	quadrantOffset + quadrant - quadrantsX * quadrantOffset - quadrantOffset, 
			  	quadrantOffset + quadrant - quadrantsX * quadrantOffset, 
			  	quadrantOffset + quadrant - quadrantsX * quadrantOffset + quadrantOffset, 
			  	quadrantOffset + quadrant + quadrantOffset
			],
			{ direction, bestDirection } = agents[i].getDirection(_all);

		if (typeof bestDirection == "number" && direction != bestDirection) {

			let newAngle = getNewDirection(direction, bestDirection);

			const scalar = deltaTime * Math.random();

			agents[i].angle = Vector2.add(agents[i].angle, Vector2.multiply_scalar(newAngle, scalar));
			agents[i].angle = Vector2.clamp(agents[i].angle, Vector2.from_number(-1), Vector2.from_number(1));

		}

	}

});

for (let a = 0; a < 2000; a++) {
	agents.push(new Agent(CANVAS.dimensions, agentColor));
}