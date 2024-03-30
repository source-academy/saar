import { type ARObject } from './ARObject';
import { Vector3 } from 'three/src/math/Vector3';
import React from 'react';
type Props = {
    arObject: ARObject;
    getUserPosition: () => Vector3;
    setUUID: (uuid: string) => void;
    onSelect?: (arObject: ARObject) => void;
    children?: JSX.Element | JSX.Element[];
};
/**
 * Component for showing a single AR object.
 * Use translatePosition and translateRotation if callibration is required.
 */
export declare function ARObjectComponent(props: Props): React.JSX.Element | null;
export {};
