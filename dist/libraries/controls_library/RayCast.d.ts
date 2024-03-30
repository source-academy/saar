import { type Camera } from 'three/src/cameras/Camera';
import { Mesh } from 'three/src/objects/Mesh';
import { type Object3DEventMap, Object3D } from 'three/src/core/Object3D';
/**
 * Returns first object in the middle of the screen, if any.
 *
 * Rules for an object to be checked:
 * 1. The object should be a child of the coreObject or a child of the child of the coreObject, etc...
 * 2. The object must be a mesh.
 * 3. The object cannot have a mesh parent or parent with a mesh parent, etc... The parent can be a group.
 *
 * @param camera Current instance of Three.js camera
 * @param coreObject Parent node containing all objects
 */
export declare function getIntersection(camera: Camera, coreObject: Object3D): Mesh<import("three").BufferGeometry<import("three").NormalBufferAttributes>, import("three").Material | import("three").Material[], Object3DEventMap> | undefined;
