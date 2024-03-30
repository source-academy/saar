import { type MutableRefObject } from 'react';
import { type ARObject } from '../ARObject';
import { type LightModel } from '../Behaviour';
import { type SpringValue } from '@react-spring/three';
import React from 'react';
type LightProps = {
    lightModel: LightModel;
    arObject: ARObject;
    meshRef: MutableRefObject<any>;
    springPosition: SpringValue<[number, number, number]>;
    children?: JSX.Element | JSX.Element[];
};
/**
 * Component for a light source shining from a particular positon.
 */
export declare function LightComponent(props: LightProps): React.JSX.Element;
export {};
