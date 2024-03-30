import { type SpringValue } from '@react-spring/three';
import { type InterfaceModel } from '../Behaviour';
import { type MutableRefObject } from 'react';
import type { UIBasicItem } from '../ui_component/UIItem';
import React from 'react';
type InterfaceProps = {
    interfaceModel: InterfaceModel;
    meshRef: MutableRefObject<any>;
    springPosition: SpringValue<[number, number, number]>;
    isSelected: boolean;
    isInFront: boolean;
};
/**
 * Component for showing floating UI.
 */
export declare function InterfaceComponent(props: InterfaceProps): React.JSX.Element;
/**
 * Parses the json of an interface back to the original classes.
 * Used for restoring the UI after json conversion.
 *
 * @param uiJson Json of the UI to show
 */
export declare function parseJsonInterface(uiJson: any): UIBasicItem | undefined;
export {};
