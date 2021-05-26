/**
 * @param  {number}  x
 * @param  {number}  y
 * @param  {number}  z
 * @constructor
 */
const Vector3 = function(x, y, z) { this.x = x; this.y = y; this.z = z };
/**
 * magnitude of a 3d_vector.
 * @param   {Vector3}  v
 * @return  {number}
 */
Vector3.magnitude = function(v) { return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2) };
/**
 * normalize a 3d_vector.
 * @param   {Vector3}  v
 * @return  {Vector3}
 */
Vector3.normalize = function(v) { const magnitude = Vector3.magnitude(v); let normalized; if (magnitude != 0) { normalized = Vector3.divide(v, Vector3.from_number(magnitude)) } else { normalized = Vector3.from_number(0) } return normalized };
/**
 * round x, y and z to the largest integer value that is less than or equal to them.
 * @param   {Vector3}  v
 * @return  {Vector3}
 */
Vector3.floor = function(v) { return new Vector3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z) ) };
/**
 * round x, y and z to the largest integer value that is higher than or equal to them.
 * @param   {Vector3}  v
 * @return  {Vector3}
 */
Vector3.ceil = function(v) { return new Vector3(Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z)) };
/**
 * round x, y and z to the nearest integer value.
 * @param   {Vector3}  v
 * @return  {Vector3}
 */
Vector3.round = function(v) { return new Vector3(Math.round(v.x), Math.round(v.y), Math.round(v.z)) };
/**
 * returns a 3d_vector with x, y and z set to the same number.
 * @param   {number}  n
 * @return  {Vector3}
 */
Vector3.from_number = function(n) { return new Vector3(n, n, n) };
/**
 * addition between two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @return  {Vector3}
 */
Vector3.add = function(a, b) { return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z) };
/**
 * subtraction between two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @return  {Vector3}
 */
Vector3.subtract = function(a, b) { return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z) };
/**
 * multiplication between two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @return  {Vector3}
 */
Vector3.multiply = function(a, b) { return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z) };
/**
 * division between two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @return  {Vector3}
 */
Vector3.divide = function(a, b) { return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z) };
/**
 * addition between a 3d_vector and a scalar value.
 * @param   {Vector3}  v
 * @param   {number}   n
 * @return  {Vector3}
 */
Vector3.add_scalar = function(v, n) { return new Vector3(v.x + n, v.y + n, v.z + n) };
/**
 * subtraction between a 3d_vector and a scalar value.
 * @param   {Vector3}  v
 * @param   {number}   n
 * @return  {Vector3}
 */
Vector3.subtract_scalar = function(v, n) { return new Vector3(v.x - n, v.y - n, v.z - n) };
/**
 * multiplication between a 3d_vector and a scalar value.
 * @param   {Vector3}  v
 * @param   {number}   n
 * @return  {Vector3}
 */
Vector3.multiply_scalar = function(v, n) { return new Vector3(v.x * n, v.y * n, v.z * n) };
/**
 * division between a 3d_vector and a scalar value.
 * @param   {Vector3}  v
 * @param   {number}   n
 * @return  {Vector3}
 */
Vector3.divide_scalar = function(v, n) { return new Vector3(v.x / n, v.y / n, v.z / n) };
/**
 * dot product of two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @return  {number}
 */
Vector3.dot = function(a, b) { return a.x * b.x + a.y * b.y + a.z * b.z };
/**
 * clamp 3d_vector between two 3d_vectors.
 * @param   {Vector3}  v
 * @param   {Vector3}  min
 * @param   {Vector3}  max
 * @return  {Vector3}
 */
Vector3.clamp = function(v, min, max) { return new Vector3(Math.max(min.x, Math.min(v.x, max.x)), Math.max(min.y, Math.min(v.y, max.y)), Math.max(min.z, Math.min(v.z, max.z))) };
/**
 * randomize x, y and z within the same range.
 * @param   {number}  min
 * @param   {number}  max
 * @return  {Vector3}
 */
Vector3.random = function(min, max) { return new Vector3(Math.random() * (max - min) + min, Math.random() * (max - min) + min, Math.random() * (max - min) + min) };
/**
 * random x, y and z between two 3d_vectors.
 * @param   {Vector3}  min
 * @param   {Vector3}  max
 * @return  {Vector3}
 */
Vector3.range = function(min, max) { return new Vector3(Math.random() * (max.x - min.x) + min.x, Math.random() * (max.y - min.y) + min.y, Math.random() * (max.z - min.z) + min.z) };
/**
 * linear interpolation between two 3d_vectors.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @param   {number}   t  number between 0 and 1.
 * @return  {Vector3}
 */
Vector3.lerp = function(a, b, t) { return new Vector3((1 - t) * a.x + b.x * t, (1 - t) * a.y + b.y * t, (1 - t) * a.z + b.z * t) }
/**
 * inverse of linear interpolation.
 * @param   {Vector3}  a
 * @param   {Vector3}  b
 * @param   {Vector3}  v  3d_vector between a and b.
 * @return  {number}
 */
Vector3.invLerp = function(a, b, v) { return ((v.x - a.x) / (b.x - a.x) + (v.y - a.y) / (b.y - a.y) + (v.z - a.z) / (b.z - a.z)) / 3 }
/**
 * remap a 3d_vector from a range to another.
 * @param   {Vector3}  inputMin
 * @param   {Vector3}  inputMax
 * @param   {Vector3}  outputMin
 * @param   {Vector3}  outputMax
 * @param   {Vector3}  v
 * @return  {Vector3}
 */
Vector3.remap = function(inputMin, inputMax, outputMin, outputMax, v) { const t = Vector3.invLerp(inputMin, inputMax, v); return Vector3.lerp(outputMin, outputMax, t) }
/**
 * @const {Vector3}
 */
Vector3.zero = new Vector3(0, 0, 0);
/**
 * @const {Vector3}
 */
Vector3.up = new Vector3(0, 1, 0);
/**
 * @const {Vector3}
 */
Vector3.down = new Vector3(0, -1, 0);
/**
 * @const {Vector3}
 */
Vector3.right = new Vector3(1, 0, 0);
/**
 * @const {Vector3}
 */
Vector3.left = new Vector3(-1, 0, 0);
/**
 * @const {Vector3}
 */
Vector3.forward = new Vector3(0, 0, 1);
/**
 * @const {Vector3}
 */
Vector3.back = new Vector3(0, 0, -1);

Object.freeze(Vector3);
Object.freeze(Vector3.zero);
Object.freeze(Vector3.up);
Object.freeze(Vector3.down);
Object.freeze(Vector3.right);
Object.freeze(Vector3.left);
Object.freeze(Vector3.forward);
Object.freeze(Vector3.back);