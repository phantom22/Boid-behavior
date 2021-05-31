/**
 * @param  {number}  x
 * @param  {number}  y
 * @return {Array}
 */
const Vector2 = function(x, y) { return [x, y] };
/**
 * magnitude of a 2d_vector.
 * @param   {Array}  v
 * @return  {number}
 */
Vector2.magnitude = function(v) { return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2)) };
/**
 * normalize a 2d_vector.
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.normalize = function(v) { const magnitude = Vector2.magnitude(v); let normalized; if (magnitude != 0) { normalized = Vector2.divide_scalar(v, magnitude) } else { normalized = [0, 0] } return normalized };
/**
 * round x and y to the largest integer value that is less than or equal to them.
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.floor = function(v) { return [Math.floor(v[0]), Math.floor(v[1])] };
/**
 * round x and y to the largest integer value that is higher than or equal to them.
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.ceil = function(v) { return [Math.ceil(v[0]), Math.ceil(v[1])] };
/**
 * round x and y to the nearest integer value.
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.round = function(v) { return [Math.round(v[0]), Math.round(v[1])] };
/**
 * returns a 2d_vector with x and y set to the same number.
 * @param   {number}  n
 * @return  {Array}
 */
Vector2.from_number = function(n) { return [n, n] };
/**
 * replace all NaNs with zero
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.fix = function(v) { return [Number.isNaN(v[0]) ? 0 : v[0], Number.isNaN(v[1]) ? 0 : v[1]] }
/**
 * addition between two 2d_vectors.
 * @param   {Array}  a
 * @param   {Array}  b
 * @return  {Array}
 */
Vector2.add = function(a, b) { return [a[0] + b[0], a[1] + b[1]] };
/**
 * subtraction between two 2d_vectors.
 * @param   {Array}  a
 * @param   {Array}  b
 * @return  {Array}
 */
Vector2.subtract = function(a, b) { return [a[0] - b[0], a[1] - b[1]] };
/**
 * multiplication between two 2d_vectors.
 * @param   {Array}  a
 * @param   {Array}  b
 * @return  {Array}
 */
Vector2.multiply = function(a, b) { return [a[0] * b[0], a[1] * b[1]] };
/**
 * division between two 2d_vectors.
 * @param   {Array}  a
 * @param   {Array}  b
 * @return  {Array}
 */
Vector2.divide = function(a, b) { return [a[0] / b[0], a[1] / b[1]] };
/**
 * addition between a 2d_vector and a scalar value.
 * @param   {Array}  a
 * @param   {number}   n
 * @return  {Array}
 */
Vector2.add_scalar = function(a, n) { return [a[0] + n, a[1] + n] };
/**
 * subtraction between a 2d_vector and a scalar value.
 * @param   {Array}  a
 * @param   {number}   n
 * @return  {Array}
 */
Vector2.subtract_scalar = function(a, n) { return [a[0] - n, a[1] - n] };
/**
 * multiplication between a 2d_vector and a scalar value.
 * @param   {Array}  a
 * @param   {number}   n
 * @return  {Array}
 */
Vector2.multiply_scalar = function(a, n) { return [a[0] * n, a[1] * n] };
/**
 * division between a 2d_vector and a scalar value.
 * @param   {Array}  a
 * @param   {number}   n
 * @return  {Array}
 */
Vector2.divide_scalar = function(a, n) { return [a[0] / n, a[1] / n] };
/**
 * dot product of two 2d_vectors.
 * @param   {Array}  a
 * @param   {Array}  b
 * @return  {number}
 */
Vector2.dot = function(a, b) { return a[0] * b[0] + a[1] * b[1] };
/**
 * clamp 2d_vector between two 2d_vectors.
 * @param   {Array}  v
 * @param   {Array}  min
 * @param   {Array}  max
 * @return  {Array}
 */
Vector2.clamp = function(v, min, max) { return [Math.max(min[0], Math.min(v[0], max[0])), Math.max(min[1], Math.min(v[1], max[0]))] };
/**
 * clamp 2d_vector between two numbers.
 * @param   {Array}  v
 * @param   {Array}  min
 * @param   {Array}  max
 * @return  {Array}
 */
Vector2.clamp_scalar = function(v, min, max) { return [Math.max(min, Math.min(v[0], max)), Math.max(min, Math.min(v[1], max))] };
/**
 * randomize x and y within the same range.
 * @param   {number}  min
 * @param   {number}  max
 * @return  {Array}
 */
Vector2.random = function(min, max) { return [Math.random() * (max - min) + min, Math.random() * (max - min) + min] };
/**
 * random x and y between two 2d_vectors.
 * @param   {Array}  min
 * @param   {Array}  max
 * @return  {Array}
 */
Vector2.range = function(min, max) { return [Math.random() * (max[0] - min[0]) + min[0], Math.random() * (max[0] - min[1]) + min[1]] };
/**
 * linear interpolation between two 2d_vectors.
 * @param   {Array}   v
 * @param   {Array}   b
 * @param   {number}  t  number between 0 and 1.
 * @return  {Array}
 */
Vector2.lerp = function(v, b, t) { return [(1 - t) * v[0] + b[0] * t, (1 - t) * v[1] + b[1] * t] }
/**
 * inverse of linear interpolation.
 * @param   {Array}  a
 * @param   {Array}  b
 * @param   {Array}  v  2d_vector between a and b.
 * @return  {number}
 */
Vector2.invLerp = function(a, b, v) { return ((v[0] - a[0]) / (b[0] - a[0]) + (v[1] - a[1]) / (b[1] - a[1])) / 2 }
/**
 * remap a 2d_vector from a range to another.
 * @param   {Array}  inputMin
 * @param   {Array}  inputMax
 * @param   {Array}  outputMin
 * @param   {Array}  outputMax
 * @param   {Array}  v
 * @return  {Array}
 */
Vector2.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector2.invLerp(inputMin, inputMax, v); return Vector2.lerp(outputMin, outputMax, t) }
/**
 * angle, in radians, between two 2d_vectors
 * @param  {Array} a
 * @param  {Array} b
 * @return {number}
 */
Vector2.angle = function(a, b) { const angle = Math.acos(Vector2.dot(a, b) / (Vector2.magnitude(a) * Vector2.magnitude(b))); return isNaN(angle) ? 0 : angle }
/**
 * angle, in degrees, of a single 2d_vector
 * @param  {Array} a
 * @return {number}
 */
Vector2.angle_from_origin = function(a) { const equal = Math.atan2(a[0], a[1]); return a[0] < 0 ? Math.PI * 2 - equal : equal }
/**
 * @const {Array}
 */
Vector2.zero = Vector2(0, 0);
/**
 * @const {Array}
 */
Vector2.up = Vector2(0, 1);
/**
 * @const {Array}
 */
Vector2.down = Vector2(0, -1);
/**
 * @const {Array}
 */
Vector2.right = Vector2(1, 0);
/**
 * @const {Array}
 */
Vector2.left = Vector2(-1, 0);

Object.freeze(Vector2);
Object.freeze(Vector2.zero);
Object.freeze(Vector2.up);
Object.freeze(Vector2.down);
Object.freeze(Vector2.right);
Object.freeze(Vector2.left);