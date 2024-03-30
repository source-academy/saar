import { type UIBasicItem, UILayoutItem, type PaddingType } from './UIItem';
import { Vector3 } from 'three/src/math/Vector3';
import React from 'react';
export declare enum HorizontalAlignment {
    Left = 0,
    Center = 1,
    Right = 2
}
type UIColumnProps = {
    children?: UIBasicItem[];
    horizontalAlignment?: HorizontalAlignment;
    padding?: number | PaddingType;
    backgroundColor?: number;
    id?: string;
};
/**
 * Column layout subcomponent for InterfaceComponent.
 */
export declare class UIColumnItem extends UILayoutItem {
    horizontalAlignment: HorizontalAlignment;
    background: number;
    constructor(props: UIColumnProps);
    getWidth: () => number;
    getHeight: () => number;
    static parseJson(uiJson: any, id: string, paddingLeft: number | undefined, paddingRight: number | undefined, paddingTop: number | undefined, paddingBottom: number | undefined, parseJsonInterface: (uiJson: any) => UIBasicItem | undefined): UIColumnItem | undefined;
    getComponent: (position: Vector3, updateParent: () => void) => React.JSX.Element;
}
export {};
