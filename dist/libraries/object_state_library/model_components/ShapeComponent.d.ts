import { type MutableRefObject, type ReactNode } from 'react';
import { type ShapeModel } from '../Behaviour';
import { type SpringValue } from '@react-spring/three';
import React from 'react';
type ShapeProps = {
    shapeModel: ShapeModel;
    meshRef: MutableRefObject<any>;
    springPosition: SpringValue<[number, number, number]>;
    isSelected: boolean;
    isInFront: boolean;
    children: ReactNode | undefined;
};
/**
 * Component for showing a Three.js shape.
 */
export declare function ShapeComponent(props: ShapeProps): React.JSX.Element;
export {};
