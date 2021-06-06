const deltaTime = 0.016;

/** @const {Object} */
const canvasSettings = {
    query: "#canvas-output",
    dimensions: Vector2(1800, 900),
    quadrantSize: 200, // in pixels
    quadrantDistance: 1
}

/** @const {Object} */
const agentSettings =  {
    count: 6000,
    limits: [[0, 0], canvasSettings.dimensions],
    xy: Vector2(canvasSettings.dimensions[0] / 2, canvasSettings.dimensions[1] / 2),
    angle: Math.PI / 6,
    speed: 300,
    turnRate: 2,
    colors: "#ff8080 #ff9f80 #ffbf80 #ffdf80 #ffff80 #dfff80 #bfff80 #9fff80 #80ff80 #80ff9f #80ffbf #80ffdf #80ffff #80dfff #80bfff #809fff #8080ff #9f80ff #bf80ff #df80ff #ff80ff #ff80df #ff80bf #ff809f #ff8080".split(" "),
    startColor: 0,
    trailDim: 0
}

class Canvas {
    constructor(settings, agentSettings, callback) {
        const canvas = document.querySelector(settings.query);
        canvas.width = settings.dimensions[0];
        canvas.height = settings.dimensions[1];
        canvas.style.width = settings.dimensions[0];
        canvas.style.height = settings.dimensions[1];
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
        this.ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);
    }
    drawLine(start, end, color) {
        const ctx = this.ctx;
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(start[0], start[1]);
        ctx.lineTo(end[0], end[1]);
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
        this.xy = Array.isArray(settings.xy[0]) && Array.isArray(settings.xy[1]) ? Vector2.range(settings.xy[0], settings.xy[1]) : settings.xy;
        this.angle = Array.isArray(settings.angle) ? Math.random() * (settings.angle[1] - settings.angle[0]) + settings.angle[0] : settings.angle;
        this.colors = settings.colors;
        this.color = typeof settings.startColor === "number" ? this.colors[settings.startColor] : this.colors[Math.floor(Math.random() * settings.colors.length)];

    }
    move() {
        const t = this, 
              newPos = Vector2.add(t.xy, Vector2(Math.cos(t.angle) * agentSettings.speed * deltaTime, Math.sin(t.angle) * agentSettings.speed * deltaTime)),
              xBounce = newPos[0] < t.limits[0][0] || newPos[0] > t.limits[1][0],
              yBounce = newPos[1] < t.limits[0][1] || newPos[1] > t.limits[1][1];

        if (xBounce || yBounce) {
            t.xy = Vector2.clamp(t.xy, t.limits[0], t.limits[1]);
            t.angle = xBounce ? Math.PI - t.angle : Math.PI * 2 - t.angle;
            let index = t.colors.indexOf(t.color);
            index = index + 1 === t.colors.length ? 0 : index + 1;
            t.color = t.colors[index];
        }
        else {
            t.xy = newPos;
        }
    }
    getDirection(quadrant, quadrantsX, quadrantsY) {
        const rad = this.angle,
              qD = canvasSettings.quadrantDistance,
              _all = [ 
                    qD + quadrant - qD, 
                    qD + quadrant - quadrantsX * qD - qD, 
                    qD + quadrant - quadrantsX * qD, 
                    qD + quadrant - quadrantsX * qD + qD, 
                    qD + quadrant + qD,
                    qD + quadrant + quadrantsX * qD - qD,
                    qD + quadrant + quadrantsX * qD,
                    qD + quadrant + quadrantsX * qD + qD
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

/** @const {Canvas} */
const CANVAS = new Canvas(canvasSettings, agentSettings, function(t) {

    // reset quadrants
    t.quadrants = [];

    const quadrantsX = t.dimensions[0] / canvasSettings.quadrantSize,
          quadrantsY = t.dimensions[1] / canvasSettings.quadrantSize,
          _optimizedX = 1 / (t.dimensions[0] / quadrantsX),
          _optimizedY = 1 / (t.dimensions[1] / quadrantsY);

    // trail effect
    t.ctx.fillStyle = "rgba(0, 0, 0, " + agentSettings.trailDim + ")";
    t.ctx.fillRect(0, 0, t.dimensions[0], t.dimensions[1]);

    for (let i = 0; i < t.agents.length; i++) {

        // get current quadrant
        const oldPos = t.agents[i].xy,
              quadrant = Math.floor(Math.floor(oldPos[1] * _optimizedY) * quadrantsX + Math.floor(oldPos[0] * _optimizedX));

        // update current quadrants number of agents
        if (typeof quadrants[quadrant] == "undefined") quadrants[quadrant] = 0;
        quadrants[quadrant] += 1;

        // update angle, based on current quadrant
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