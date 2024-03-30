import { type Vector3 } from 'three/src/math/Vector3';
import React from 'react';
export type PaddingType = {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
};
/**
 * Base class for a subcomponent in InterfaceComponent.
 */
export declare class UIBasicItem {
    type: string;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    id: string;
    layer: number;
    parent?: UIBasicItem;
    constructor(type: string, padding?: number | PaddingType, id?: string);
    toJSON: () => any;
    getWidth: () => number;
    getHeight: () => number;
    calculateLayer: () => void;
    getComponent: (position: Vector3, _: () => void) => React.JSX.Element;
}
/**
 * Class for a layout subcomponent in InterfaceComponent.
 */
export declare class UILayoutItem extends UIBasicItem {
    children: UIBasicItem[];
    calculateLayer: () => void;
}
