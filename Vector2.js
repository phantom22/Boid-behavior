const Vector2 = function(x,y) { if (typeof x != 'number' || typeof y != 'number') { throw new Error(`expected two arguments of type 'number', got '${typeof x}, ${typeof y}'`) } this.x = x; this.y = y }
Vector2.prototype.magnitude = function() { return Math.sqrt(this.x ** 2 + this.y ** 2) };
Vector2.prototype.normalize = function () { const magnitude = this.magnitude(); let normalized; if (magnitude != 0) { console.log(this); normalized = Vector2.divide(this, magnitude) } else { normalized = Vector2.from_number(0) } return normalized };
Vector2.prototype.scalar = function() { const normalized = this.normalize(); return (normalized.x + normalized.y) / 2 };
Vector2.prototype.floor = function() { return new Vector2(Math.floor(this.x), Math.floor(this.y)) };
Vector2.prototype.ceil = function() { return new Vector2(Math.ceil(this.x), Math.ceil(this.y)) };

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
Vector2.random = function(max, min) { max = max ?? 1; min = min ?? 0; return new Vector2(Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
Vector2.range = function(max, min) { min = min ?? Vector2.zero; return new Vector2(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y) };

Vector2.lerp = function(a, b, t) { t = Math.max(0, Math.min(1, t)); return new Vector2((1 - t) * a.x + b.x * t, (1 - t) * a.y + b.y * t) }
Vector2.invLerp = function(a, b, v) { return new Vector2((v.x - a.x) / (b.x - a.x), (v.y - a.y) / (b.y - a.y)) }
Vector2.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector2.invLerp(inputMin, inputMax, v); return Vector2.lerp(outputMin, outputMax, t) }

Vector2.angle = function(a, b) { const angle = Math.acos(Vector2.dot(a, b) / ( Math.sqrt(a.magnitude() * b.magnitude()) ) ); return isNaN(angle) ? 0 : angle }
Vector2.zero = Vector2.from_number(0);
Vector2.up = new Vector2(0, 1);
Vector2.down = new Vector2(0, -1);
Vector2.right = new Vector2(1, 0);
Vector2.left = new Vector2(-1, 0);

Object.freeze(Vector2);