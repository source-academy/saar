import { type UIBasicItem, UILayoutItem, type PaddingType } from './UIItem';
import { Vector3 } from 'three/src/math/Vector3';
import React from 'react';
export declare enum VerticalAlignment {
    Top = 0,
    Middle = 1,
    Bottom = 2
}
type UIRowProps = {
    children?: UIBasicItem[];
    verticalAlignment?: VerticalAlignment;
    padding?: number | PaddingType;
    backgroundColor?: number;
    id?: string;
};
/**
 * Row layout subcomponent for InterfaceComponent.
 */
export declare class UIRowItem extends UILayoutItem {
    verticalAlignment: VerticalAlignment;
    background: number;
    constructor(props: UIRowProps);
    getWidth: () => number;
    getHeight: () => number;
    static parseJson(uiJson: any, id: string, paddingLeft: number | undefined, paddingRight: number | undefined, paddingTop: number | undefined, paddingBottom: number | undefined, parseJsonInterface: (uiJson: any) => UIBasicItem | undefined): UIRowItem | undefined;
    getComponent: (position: Vector3, updateParent: () => void) => React.JSX.Element;
}
export {};
