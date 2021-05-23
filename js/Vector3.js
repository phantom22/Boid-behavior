const Vector3 = function(x, y, z) { if (typeof x != 'number' || typeof y != 'number' || typeof z != 'number') { throw new Error(`expected three arguments of type 'number', got '${typeof x}, ${typeof y}, ${typeof z}'`) } this.x = x; this.y = y; this.z = z };

Vector3.prototype = { 
	magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) },
	normalize() { const magnitude = this.magnitude; let normalized; if (magnitude != 0) { normalized = Vector3.divide(this, Vector3.from_number(magnitude)) } else { normalized = Vector3.from_number(0) } return normalized },
	floor() { return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z)) },
	ceil() { return new Vector3(Math.ceil(this.x), Math.floor(this.y), Math.floor(this.z)) },
	round() { return new Vector3(Math.round(this.x), Math.round(this.y), Math.round(this.z)) }
}

Vector3.from_number = function(n) { return new Vector3(n, n, n) };

Vector3.add = function(a, b) { return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z) };
Vector3.subtract = function(a, b) { return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z) };
Vector3.multiply = function(a, b) { return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z) };
Vector3.divide = function(a, b) { return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z) };

Vector3.sum = function(a, b) { return a.x + b.x + a.y + b.y + a.z + b.z };
Vector3.diff = function(a, b) { return a.x - b.x + a.y - b.y + a.z - b.z };
Vector3.dot = function(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z };
Vector3.quot = function(a, b) { return a.x / b.x + a.y / b.y + a.z / b.z };

Vector3.clamp = function(vector, min, max) { return new Vector2(Math.max(min.x, Math.min( vector.x, max.x )), Math.max(min.y, Math.min( vector.y, max.y )), Math.max(min.z, Math.min( vector.z, max.z ))) };
Vector3.random = function(min, max) { return new Vector3(Math.random() * (max - min) + min, Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
Vector3.range = function(min, max) { return new Vector3(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y, Math.random() * (max.z - min.z) + min.z) };

Vector3.lerp = function(a, b, t) { t = Math.max(0, Math.min(1, t)); return new Vector3((1 - t) * a.x + b.x * t, (1 - t) * a.y + b.y * t, (1 - t) * a.z + b.z * t) }
Vector3.invLerp = function(a, b, v) { return ((v.x - a.x) / (b.x - a.x) + (v.y - a.y) / (b.y - a.y) + (v.z - a.z) / (b.z - a.z)) / 3 }
Vector3.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector3.invLerp(inputMin, inputMax, v); return Vector3.lerp(outputMin, outputMax, t) }

Vector3.angle = function(a, b) { const angle = Math.acos(Vector3.dot(a, b) / (a.magnitude() * b.magnitude())); return isNaN(angle) ? 0 : angle }

Vector3.zero = Vector3.from_number(0);
Vector3.up = new Vector3(0, 1, 0);
Vector3.down = new Vector3(0, -1, 0);
Vector3.right = new Vector3(1, 0, 0);
Vector3.left = new Vector3(-1, 0, 0);
Vector3.forward = new Vector3(0, 0, 1);
Vector3.back = new Vector3(0, 0, -1);

Object.freeze(Vector3);
Object.freeze(Vector3.zero);
Object.freeze(Vector3.up);
Object.freeze(Vector3.down);
Object.freeze(Vector3.right);
Object.freeze(Vector3.left);
Object.freeze(Vector3.forward);
Object.freeze(Vector3.back);