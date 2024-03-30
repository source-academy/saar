import { Vector3 } from 'three/src/math/Vector3';
import { type Behaviours, type RotationClass, type RenderClass, type MovementClass } from './Behaviour';
import React from 'react';
/**
 * Abstract class for an AR object.
 * Extend this class to create your custom AR object.
 */
export declare class ARObject {
    type: string;
    id: string;
    position: Vector3;
    behaviours: Behaviours;
    uuid: string | undefined;
    isInFront: boolean;
    isSelected: boolean;
    onSelect?: (arObject: ARObject) => void;
    constructor(id: string, position: Vector3, behaviours: Behaviours, onSelect?: (arObject: ARObject) => void);
    toJSON: () => this;
    static fromObject: (object: any, getCurrentTime?: () => number) => ARObject | undefined;
    getComponent(getUserPosition: () => Vector3): React.JSX.Element;
}
export declare class CubeObject extends ARObject {
    type: string;
    width: number;
    height: number;
    depth: number;
    color: number;
    constructor(id: string, position: Vector3, width: number, height: number, depth: number, color: number, render?: RenderClass, rotation?: RotationClass, movement?: MovementClass, onSelect?: (arObject: ARObject) => void);
    static parseObject(object: any, onSelect?: () => void, getCurrentTime?: () => number): ARObject | undefined;
}
export declare class SphereObject extends ARObject {
    type: string;
    radius: number;
    color: number;
    constructor(id: string, position: Vector3, radius: number, color: number, render?: RenderClass, rotation?: RotationClass, movement?: MovementClass, onSelect?: (arObject: ARObject) => void);
    static parseObject(object: any, onSelect?: () => void, getCurrentTime?: () => number): ARObject | undefined;
}
export declare class GltfObject extends ARObject {
    type: string;
    src: string;
    scale: number;
    constructor(id: string, position: Vector3, src: string, scale: number, render?: RenderClass, rotation?: RotationClass, movement?: MovementClass, onSelect?: (arObject: ARObject) => void);
    static parseObject(object: any, onSelect?: () => void, getCurrentTime?: () => number): ARObject | undefined;
}
export declare class UIObject extends ARObject {
    type: string;
    uiJson: any;
    constructor(id: string, position: Vector3, uiJson: any, render?: RenderClass, rotation?: RotationClass, movement?: MovementClass, onSelect?: (arObject: ARObject) => void);
    static parseObject(object: any, onSelect?: () => void, getCurrentTime?: () => number): ARObject | undefined;
}
export declare class LightObject extends ARObject {
    type: string;
    intensity: number;
    constructor(id: string, position: Vector3, intensity: number);
    static parseObject(object: any): ARObject | undefined;
}
