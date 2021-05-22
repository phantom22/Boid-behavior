const Vector3 = function(x, y, z) { if (typeof x != 'number' || typeof y != 'number' || typeof z != 'number') { throw new Error(`expected three arguments of type 'number', got '${typeof x}, ${typeof y}, ${typeof z}'`) } this.x = x; this.y = y; this.z = z };
Vector3.prototype.magnitude = function() { return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) };
Vector3.prototype.normalize = function() { const magnitude = this.magnitude(); let normalized; if (magnitude != 0) { normalized = Vector3.divide(this, magnitude) } else { normalized = Vector3.from_number(0) } return normalized };
Vector3.prototype.scalar = function() { const normalized = this.normalize(); return (normalized.x + normalized.y + normalized.z) / 3 };
Vector3.prototype.floor = function() { return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z)) };
Vector3.prototype.ceil = function() { return new Vector3(Math.ceil(this.x), Math.floor(this.y), Math.floor(this.z)) };

Vector3.from_number = function(n) { if (typeof n != "number" && !n instanceof Vector3) { throw new Error(`expected one argument of type 'number', got '${typeof n}'`) } return n instanceof Vector3 ? n : new Vector3(n, n, n) };

Vector3.add = function(a, b) { return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z) };
Vector3.subtract = function(a, b) { return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z) };
Vector3.multiply = function(a, b) { return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z) };
Vector3.divide = function(a, b) { return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z) };

Vector3.sum = function(a, b) { return a.x + b.x + a.y + b.y + a.z + b.z };
Vector3.diff = function(a, b) { return a.x - b.x + a.y - b.y + a.z - b.z };
Vector3.dot = function(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z };
Vector3.quot = function(a, b) { return a.x / b.x + a.y / b.y + a.z / b.z };

Vector3.clamp = function(vector, min, max) { vector.x = Math.max(min.x, Math.min( vector.x, max.x )); vector.y = Math.max(min.y, Math.min( vector.y, max.y )); vector.z = Math.max(min.z, Math.min( vector.z, max.z )); return vector };
Vector3.random = function(max, min) { max = max ?? 1; min = min ?? 0; return new Vector3(Math.random() * (max - min) + min, Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
Vector3.range = function(max, min) { min = min ?? Vector3.zero; return new Vector3(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y, Math.random() * (max.z - min.z) + min.z) };

Vector3.lerp = function(a, b, t) { t = Math.max(0, Math.min(1, t)); return new Vector3((1 - t.x) * a.x + b.x * t.x, (1 - t.y) * a.y + b.y * t.y, (1 - t) * a.z + b.z * t.z) }
Vector3.invLerp = function(a, b, v) { return new Vector3((v.x - a.x) / (b.x - a.x), (v.y - a.y) / (b.y - a.y), (v.z - a.z) / (b.z - a.z)) }
Vector3.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector3.invLerp(inputMin, inputMax, v); return Vector3.lerp(outputMin, outputMax, t) }

Vector3.angle = function(a, b) { const angle = Math.acos(Vector3.dot(a, b) / ( Math.sqrt(a.magnitude() * b.magnitude()) ) ); return isNaN(angle) ? 0 : angle }
Vector3.zero = Vector3.from_number(0);
Vector3.up = new Vector3(0, 1, 0);
Vector3.down = new Vector3(0, -1, 0);
Vector3.right = new Vector3(1, 0, 0);
Vector3.left = new Vector3(-1, 0, 0);
Vector3.forward = new Vector3(0, 0, 1);
Vector3.back = new Vector3(0, 0, -1);

Object.freeze(Vector3);