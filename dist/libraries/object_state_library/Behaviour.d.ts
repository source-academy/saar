import { type BufferGeometry, type Material, type NormalBufferAttributes, Vector3 } from 'three';
import { type UIBasicItem } from './ui_component/UIItem';
export type Behaviours = {
    model: ModelClass;
    render?: RenderClass;
    rotation?: RotationClass;
    movement?: MovementClass;
};
export interface Behaviour {
}
/**
 * Base class for a model behaviour.
 */
export declare abstract class ModelClass implements Behaviour {
}
/**
 * Behaviour for a glTF model.
 *
 * @param resource Path to glTF file
 * @param scale Scale to render model
 */
export declare class GltfModel implements ModelClass {
    resource: string;
    scale: number;
    callAnimation?: (actionName: string) => void;
    constructor(resource: string, scale: number);
}
/**
 * Behaviour for ThreeJS shapes model.
 *
 * @param geometry ThreeJS geometry
 * @param material ThreeJS material
 */
export declare class ShapeModel implements ModelClass {
    geometry: BufferGeometry<NormalBufferAttributes> | undefined;
    material: Material | Material[] | undefined;
    constructor(geometry: BufferGeometry<NormalBufferAttributes> | undefined, material: Material | Material[] | undefined);
}
export declare class InterfaceModel implements ModelClass {
    rootComponent: UIBasicItem | undefined;
    constructor(rootComponent: any);
}
export declare class LightModel implements ModelClass {
    intensity: number;
    constructor(intensity: number);
}
export declare abstract class RenderClass implements Behaviour {
    type: string;
}
export declare class RenderWithinDistance implements RenderClass {
    type: string;
    distance: number;
    constructor(distance: number);
}
export declare class AlwaysRender implements RenderClass {
    type: string;
}
export declare function parseRender(render: any): RenderClass | undefined;
/**
 * Base class for a rotation behaviour.
 */
export declare abstract class RotationClass implements Behaviour {
    type: string;
}
/**
 * Behaviour where object will always rotate to the user.
 */
export declare class RotateToUser implements RotationClass {
    type: string;
}
/**
 * Behaviour where object will keep spinning around the y-axis.
 */
export declare class RotateAroundY implements RotationClass {
    type: string;
}
/**
 * Behaviour where object will stay in a fixed rotation.
 */
export declare class FixRotation implements RotationClass {
    type: string;
    rotation: number;
    constructor(radians: number);
}
export declare function parseRotation(rotation: any): RotationClass | undefined;
/**
 * Base class for a movement behaviour.
 *
 * @param startTime Reference time for the start of movement, for syncing
 */
export declare abstract class MovementClass implements Behaviour {
    type: string;
}
export declare enum MovementStyle {
    Linear = 0,
    FastToSlow = 1,
    SlowToFast = 2
}
/**
 * Defines movement in a straight line for a path.
 */
export type PathItem = {
    start: Vector3;
    end: Vector3;
    duration: number;
    style: MovementStyle;
};
/**
 * Behaviour where the object moves in the defined path.
 * Cycles through the path array repeatedly.
 *
 * @param path Array of path items defining movement of object
 * @param startTime Reference time for the start of movement, for syncing
 */
export declare class PathMovement extends MovementClass {
    type: string;
    path: PathItem[];
    totalDuration: number;
    startTime: number;
    getCurrentTime: () => number;
    constructor(path: PathItem[], startTime?: number, getCurrentTime?: () => number);
    getOffsetPosition(position: Vector3): Vector3;
}
/**
 * Behaviour where the object orbits around its position at a specified radius.
 *
 * @param radius Radius of orbit
 * @param duration Duration of a single orbit
 * @param startTime Reference time for the start of movement, for syncing
 */
export declare class OrbitMovement extends MovementClass {
    type: string;
    radius: number;
    duration: number;
    startTime: number;
    getCurrentTime: () => number;
    constructor(radius: number, duration: number, startTime?: number, getCurrentTime?: () => number);
    getOffsetPosition(position: Vector3): Vector3;
}
export declare class SpringMovement extends MovementClass {
    type: string;
}
export declare function parseMovement(movement: any, getCurrentTime?: () => number): PathMovement | OrbitMovement | SpringMovement | undefined;
