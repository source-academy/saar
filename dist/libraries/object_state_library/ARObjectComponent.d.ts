import { type ARObject } from './ARObject';
import { type ReactNode } from 'react';
import { Vector3 } from 'three';
import React from 'react';
type Props = {
    arObject: ARObject;
    getUserPosition: () => Vector3;
    setUUID: (uuid: string) => void;
    onSelect?: (arObject: ARObject) => void;
    children?: ReactNode;
};
/**
 * Component for showing a single AR object.
 * Use translatePosition and translateRotation if callibration is required.
 */
export declare function ARObjectComponent(props: Props): React.JSX.Element | null;
export {};
