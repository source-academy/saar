"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector3ToArray = exports.parseVector3 = void 0;
const Vector3_1 = require("three/src/math/Vector3");
/**
 * Converts object to a Vector3.
 *
 * @param object Object to parse
 * @returns Vector3 if successful, undefined if failed
 */
function parseVector3(object) {
    if (!object)
        return undefined;
    const x = object.x;
    const y = object.y;
    const z = object.z;
    if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
        return new Vector3_1.Vector3(x, y, z);
    }
    return undefined;
}
exports.parseVector3 = parseVector3;
/**
 * Converts Vector3 to array [x, y, z].
 *
 * @param vector Vector3 to convert
 * @returns Vector in array form
 */
function vector3ToArray(vector) {
    return [vector.x, vector.y, vector.z];
}
exports.vector3ToArray = vector3ToArray;
