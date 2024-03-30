import { Vector3 } from 'three/src/math/Vector3';
/**
 * Converts object to a Vector3.
 *
 * @param object Object to parse
 * @returns Vector3 if successful, undefined if failed
 */
export declare function parseVector3(object: any): Vector3 | undefined;
/**
 * Converts Vector3 to array [x, y, z].
 *
 * @param vector Vector3 to convert
 * @returns Vector in array form
 */
export declare function vector3ToArray(vector: Vector3): [number, number, number];
