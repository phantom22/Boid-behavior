const Vector2 = function(x,y) { if (typeof x != 'number' || typeof y != 'number') { throw new Error(`expected two arguments of type 'number', got '${typeof x}, ${typeof y}'`) } this.x = x; this.y = y }

Vector2.prototype = {
	get magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2) },
	get normalize() { const magnitude = this.magnitude; let normalized; if (magnitude != 0) { normalized = Vector2.divide(this, Vector2.from_number(magnitude)) } else { normalized = Vector2.from_number(0) } return normalized },
	floor() { return new Vector2(Math.floor(this.x), Math.floor(this.y)) },
	ceil() { return new Vector2(Math.ceil(this.x), Math.ceil(this.y)) },
	round() { return new Vector2(Math.round(this.x), Math.found(this.y)) }
};

Vector2.from_number = function(n) { if (typeof n != "number" && !n instanceof Vector2) { throw new Error(`expected one argument of type 'number', got '${typeof n}'`) } return n instanceof Vector2 ? n : new Vector2(n, n) };

Vector2.add = function(a, b) { return new Vector2(a.x + b.x, a.y + b.y) };
Vector2.subtract = function(a, b) { return new Vector2(a.x - b.x, a.y - b.y) };
Vector2.multiply = function(a, b) { return new Vector2(a.x * b.x, a.y * b.y) };
Vector2.divide = function(a, b) { return new Vector2(a.x / b.x, a.y / b.y) };

Vector2.sum = function(a, b) { return a.x + b.x + a.y + b.y };
Vector2.diff = function(a, b) { return a.x - b.x + a.y - b.y };
Vector2.dot = function(a, b) { return a.x * b.x + a.y * b.y };
Vector2.quot = function(a, b) { return a.x / b.x + a.y / b.y };

Vector2.clamp = function(vector, min, max) { vector.x = Math.max(min.x, Math.min( vector.x, max.x )); vector.y = Math.max(min.y, Math.min( vector.y, max.y )); return vector };
// both x and y are randomized with the same range
Vector2.random = function(min, max) { return new Vector2(Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
// x and y have different ranges
Vector2.range = function(min, max) { return new Vector2(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y) };

Vector2.lerp = function(a, b, t) { return new Vector2((1 - t) * a.x + b.x * t, (1 - t) * a.y + b.y * t) }
Vector2.invLerp = function(a, b, v) { return ((v.x - a.x) / (b.x - a.x) + (v.y - a.y) / (b.y - a.y)) / 2 }
Vector2.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector2.invLerp(inputMin, inputMax, v); return Vector2.lerp(outputMin, outputMax, t) }

Vector2.angle = function(a, b) { const angle = Math.acos(Vector2.dot(a, b) / (a.magnitude * b.magnitude)); return isNaN(angle) ? 0 : angle }
Vector2.zero = Vector2.from_number(0);
Vector2.up = new Vector2(0, 1);
Vector2.down = new Vector2(0, -1);
Vector2.right = new Vector2(1, 0);
Vector2.left = new Vector2(-1, 0);

Object.freeze(Vector2);