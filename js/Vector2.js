/**
 * @param  {number}  x
 * @param  {number}  y
 * @constructor
 */
const Vector2 = function(x, y) { this.x = x; this.y = y };
/**
 * magnitude of a 2d_vector.
 * @param   {Vector2}  v
 * @return  {number}
 */
Vector2.magnitude = function(v) { return Math.sqrt(v.x ** 2 + v.y ** 2) };
/**
 * normalize a 2d_vector.
 * @param   {Vector2}  v
 * @return  {Vector2}
 */
Vector2.normalize = function(v) { const magnitude = Vector2.magnitude(v); let normalized; if (magnitude != 0) { normalized = Vector2.divide(v, Vector2.from_number(magnitude)) } else { normalized = Vector2.from_number(0) } return normalized };
/**
 * round x and y to the largest integer value that is less than or equal to them.
 * @param   {Vector2}  v
 * @return  {Vector2}
 */
Vector2.floor = function(v) { return new Vector2(Math.floor(v.x), Math.floor(v.y)) };
/**
 * round x and y to the largest integer value that is higher than or equal to them.
 * @param   {Vector2}  v
 * @return  {Vector2}
 */
Vector2.ceil = function(v) { return new Vector2(Math.ceil(v.x), Math.ceil(v.y)) };
/**
 * round x and y to the nearest integer value.
 * @param   {Vector2}  v
 * @return  {Vector2}
 */
Vector2.round = function(v) { return new Vector2(Math.round(v.x), Math.round(v.y)) };
/**
 * returns a 2d_vector with x and y set to the same number.
 * @param   {number}  n
 * @return  {Vector2}
 */
Vector2.from_number = function(n) { return new Vector2(n, n) };
/**
 * addition between two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @return  {Vector2}
 */
Vector2.add = function(a, b) { return new Vector2(a.x + b.x, a.y + b.y) };
/**
 * subtraction between two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @return  {Vector2}
 */
Vector2.subtract = function(a, b) { return new Vector2(a.x - b.x, a.y - b.y) };
/**
 * multiplication between two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @return  {Vector2}
 */
Vector2.multiply = function(a, b) { return new Vector2(a.x * b.x, a.y * b.y) };
/**
 * division between two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @return  {Vector2}
 */
Vector2.divide = function(a, b) { return new Vector2(a.x / b.x, a.y / b.y) };
/**
 * addition between a 2d_vector and a scalar value.
 * @param   {Vector2}  v
 * @param   {number}   n
 * @return  {Vector2}
 */
Vector2.add_scalar = function(v, n) { return new Vector2(v.x + n, v.y + n) };
/**
 * subtraction between a 2d_vector and a scalar value.
 * @param   {Vector2}  v
 * @param   {number}   n
 * @return  {Vector2}
 */
Vector2.subtract_scalar = function(v, n) { return new Vector2(v.x - n, v.y - n) };
/**
 * multiplication between a 2d_vector and a scalar value.
 * @param   {Vector2}  v
 * @param   {number}   n
 * @return  {Vector2}
 */
Vector2.multiply_scalar = function(v, n) { return new Vector2(v.x * n, v.y * n) };
/**
 * division between a 2d_vector and a scalar value.
 * @param   {Vector2}  v
 * @param   {number}   n
 * @return  {Vector2}
 */
Vector2.divide_scalar = function(v, n) { return new Vector2(v.x / n, v.y / n) };
/**
 * dot product of two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @return  {number}
 */
Vector2.dot = function(a, b) { return a.x * b.x + a.y * b.y };
/**
 * clamp 2d_vector between two 2d_vectors.
 * @param   {Vector2}  v
 * @param   {Vector2}  min
 * @param   {Vector2}  max
 * @return  {Vector2}
 */
Vector2.clamp = function(v, min, max) { return new Vector2(Math.max(min.x, Math.min(v.x, max.x)), Math.max(min.y, Math.min(v.y, max.y))) };
/**
 * clamp 2d_vector between two numbers.
 * @param   {Vector2}  v
 * @param   {Vector2}  min
 * @param   {Vector2}  max
 * @return  {Vector2}
 */
Vector2.clamp_scalar = function(v, min, max) { return new Vector2(Math.max(min, Math.min(v.x, max)), Math.max(min, Math.min(v.y, max))) };
/**
 * randomize x and y within the same range.
 * @param   {number}  min
 * @param   {number}  max
 * @return  {Vector2}
 */
Vector2.random = function(min, max) { return new Vector2(Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
/**
 * random x and y between two 2d_vectors.
 * @param   {Vector2}  min
 * @param   {Vector2}  max
 * @return  {Vector2}
 */
Vector2.range = function(min, max) { return new Vector2(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y) };
/**
 * linear interpolation between two 2d_vectors.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @param   {number}   t  number between 0 and 1.
 * @return  {Vector2}
 */
Vector2.lerp = function(a, b, t) { return new Vector2((1 - t) * a.x + b.x * t, (1 - t) * a.y + b.y * t) }
/**
 * inverse of linear interpolation.
 * @param   {Vector2}  a
 * @param   {Vector2}  b
 * @param   {Vector2}  v  2d_vector between a and b.
 * @return  {number}
 */
Vector2.invLerp = function(a, b, v) { return ((v.x - a.x) / (b.x - a.x) + (v.y - a.y) / (b.y - a.y)) / 2 }
/**
 * remap a 2d_vector from a range to another.
 * @param   {Vector2}  inputMin
 * @param   {Vector2}  inputMax
 * @param   {Vector2}  outputMin
 * @param   {Vector2}  outputMax
 * @param   {Vector2}  v
 * @return  {Vector2}
 */
Vector2.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector2.invLerp(inputMin, inputMax, v); return Vector2.lerp(outputMin, outputMax, t) }
/**
 * angle, in radians, between two 2d_vectors
 * @param  {Vector2} a
 * @param  {Vector2} b
 * @return {number}
 */
Vector2.angle = function(a, b) { const angle = Math.acos(Vector2.dot(a, b) / (Vector2.magnitude(a) * Vector2.magnitude(b))); return isNaN(angle) ? 0 : angle }
/**
 * angle, in degrees, of a single 2d_vector
 * @param  {Vector2} v
 * @return {number}
 */
Vector2.angle_from_origin = function(v) { const equal = Math.atan2(v.x, v.y) * (180 / Math.PI); return v.x < 0 ? 360 - (equal * -1) : equal }
/**
 * @const {Vector2}
 */
Vector2.zero = new Vector2(0, 0);
/**
 * @const {Vector2}
 */
Vector2.up = new Vector2(0, 1);
/**
 * @const {Vector2}
 */
Vector2.down = new Vector2(0, -1);
/**
 * @const {Vector2}
 */
Vector2.right = new Vector2(1, 0);
/**
 * @const {Vector2}
 */
Vector2.left = new Vector2(-1, 0);

Object.freeze(Vector2);
Object.freeze(Vector2.zero);
Object.freeze(Vector2.up);
Object.freeze(Vector2.down);
Object.freeze(Vector2.right);
Object.freeze(Vector2.left);