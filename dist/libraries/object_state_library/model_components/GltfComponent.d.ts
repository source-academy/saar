import { type MutableRefObject } from 'react';
import { type GltfModel } from '../Behaviour';
import { type ARObject } from '../ARObject';
import { type SpringValue } from '@react-spring/three';
import React from 'react';
type GltfProps = {
    gltfModel: GltfModel;
    arObject: ARObject;
    meshRef: MutableRefObject<any>;
    springPosition: SpringValue<[number, number, number]>;
    children?: JSX.Element | JSX.Element[];
};
/**
 * Component for showing GLTF model.
 */
export declare function GltfComponent(props: GltfProps): React.JSX.Element;
export {};