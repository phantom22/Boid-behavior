const deltaTime = 0.016;

// TODO, saveImage is too expensive
class Canvas {
	constructor(settings, agentSettings, callback) {
		const canvas = document.querySelector(settings.query);
		canvas.width = settings.dimensions.x;
		canvas.height = settings.dimensions.y;
		canvas.style.width = settings.dimensions.x;
		canvas.style.height = settings.dimensions.y;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.callback = callback;

		this.dimensions = settings.dimensions;

		this.agents = [];

		for (let a = 0; a < agentSettings.count; a++) {
			this.agents.push(new Agent(agentSettings));
		}

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
	constructor(settings) {
		this.limits = settings.limits;
		this.xy = settings.xy; //Vector2.range(new Vector2(CANVAS.dimensions.x / 5 * 2 , CANVAS.dimensions.y / 5 * 2), new Vector2(CANVAS.dimensions.x / 5 * 3 , CANVAS.dimensions.y / 5 * 3));
		this.angle = settings.angle;//Math.random() * (Math.PI * 2 * 2) - Math.PI * 2;
		this.colors = settings.colors;
		this.color = this.colors[Math.floor(Math.random() * 8)];
	}
	move() {
		const t = this, 
			  newPos = Vector2.add(t.xy, new Vector2(Math.cos(t.angle) * agentSettings.speed * deltaTime, Math.sin(t.angle) * agentSettings.speed * deltaTime));

		if (newPos.x < 0 || newPos.x > t.limits.x || newPos.y < 0 || newPos.y > t.limits.y) {
			t.xy = Vector2.clamp(t.xy, Vector2.zero, t.limits);
			t.angle = Math.random() * (Math.PI * 2 * 2) - Math.PI * 2;//t.angle * -1 + Math.random() * 1.57 - 0.785;
			let index = t.colors.indexOf(t.color);
			index = index + 1 === t.colors.length ? 0 : index + 1;
			t.color = t.colors[index];
		}
		else {
			t.xy = newPos;
		}
	}
	getDirection(quadrant, quadrantsX, quadrantsY) {
		const rad = this.angle - Math.PI / 2,
			  _all = [
			    	quadrantOffset + quadrant + quadrantsX * quadrantOffset + quadrantOffset, 
			    	quadrantOffset + quadrant + quadrantsX * quadrantOffset, 
			    	quadrantOffset + quadrant + quadrantsX * quadrantOffset - quadrantOffset, 
			    	quadrantOffset + quadrant - quadrantOffset, 
			    	quadrantOffset + quadrant - quadrantsX * quadrantOffset - quadrantOffset, 
			    	quadrantOffset + quadrant - quadrantsX * quadrantOffset, 
			    	quadrantOffset + quadrant - quadrantsX * quadrantOffset + quadrantOffset, 
			    	quadrantOffset + quadrant + quadrantOffset
			  ];


		let direction,
			adjacent;

		if (rad > 5.105 && rad <= 5.89) {
			direction = 0;
			adjacent = [_all[7], _all[0], _all[1]];
		}
		else if (rad > 5.89 || rad <= 0.392) {
			direction = 1;
			adjacent = [_all[0], _all[1], _all[2]];
		}
		else if (rad > 0.392 && rad <= 1.178) {
			direction = 2;
			adjacent = [_all[1], _all[2], _all[3]];
		}
		else if (rad > 1.178 && rad <= 1.963) {
			direction = 3;
			adjacent = [_all[2], _all[3], _all[4]];
		}
		else if (rad > 1.963 && rad <= 2.748) {
			direction = 4;
			adjacent = [_all[3], _all[4], _all[5]];
		}
		else if (rad > 2.748 && rad <= 3.534) {
			direction = 5;
			adjacent = [_all[4], _all[5], _all[6]];
		}
		else if (rad > 3.534 && rad <= 4.319) {
			direction = 6;
			adjacent = [_all[5], _all[6], _all[7]];
		}
		else if (rad > 4.319 && rad <= 5.105) {
			direction = 7;
			adjacent = [_all[6], _all[7], _all[0]];
		}

		let mostNumberOfAgents = 0,
			bestDirection;

		for (let dir = 0; dir < 3; dir++) {
			const numberOfAgentsInCell = quadrants[adjacent[dir]];
			if (typeof numberOfAgentsInCell == "number" && numberOfAgentsInCell > mostNumberOfAgents) {
				mostNumberOfAgents = numberOfAgentsInCell;
				bestDirection =  direction + dir - 1;
			}
		}

		bestDirection = bestDirection === -1 ? 7 : bestDirection;
		bestDirection = bestDirection === 8 ? 0 : bestDirection;

		let sign;
		if (direction + bestDirection === 7) {
			sign = bestDirection === 7 ? 1 : -1;
		}
		else {
			sign = bestDirection < direction ? 1 : -1;
		}

		return { notSameDir: typeof bestDirection == "number" && direction != bestDirection, sign }
	}

}

let quadrants = [];

let quadrantSize = 100, // in pixels
	quadrantOffset = 1;

let canvasSettings = {
	query: "#canvas-output",
	dimensions: new Vector2(1200, 700)
}

/** @const {Object} */
const agentSettings =  {
	count: 2000,
	limits: canvasSettings.dimensions,
	xy: new Vector2(canvasSettings.dimensions.x / 2, canvasSettings.dimensions.y / 2),
	angle: 1,
	speed: 300,
	turnRate: 2,
	colors: ["lightcoral", "white", "red"],
	trailDim: 0.05
}

/** @const {Canvas} */
const CANVAS = new Canvas(canvasSettings, agentSettings, function(t) {

	t.quadrants = [];

	let quadrantsX = t.dimensions.x / quadrantSize,
		quadrantsY = t.dimensions.y / quadrantSize;

	// trail effect
	t.ctx.fillStyle = "rgba(0, 0, 0, " + agentSettings.trailDim + ")";
	t.ctx.fillRect(0, 0, t.dimensions.x, t.dimensions.y);

	const _optimizedX = 1 / (t.dimensions.x / quadrantsX),
		  _optimizedY = 1 / (t.dimensions.y / quadrantsY);

	for (let i = 0; i < t.agents.length; i++) {

		// get current quadrant
		const oldPos = t.agents[i].xy,
			  quadrant = Math.floor(Math.floor(oldPos.y * _optimizedY) * quadrantsX + Math.floor(oldPos.x * _optimizedX));

		// update current quadrant number of agents
		if (typeof quadrants[quadrant] == "undefined") quadrants[quadrant] = 0;
		quadrants[quadrant] += 1;

		// update angle, base on current quadrant
		const { notSameDir, sign } = t.agents[i].getDirection(quadrant, quadrantsX, quadrantsY);
		if (notSameDir) {
			const scalar = deltaTime * Math.random();
			t.agents[i].angle += agentSettings.turnRate * sign * scalar;
		}

		// move agent
		t.agents[i].move();
		const newPos = t.agents[i].xy;
		
		// draw agent
		t.drawLine(oldPos, newPos, t.agents[i].color);

	}

});