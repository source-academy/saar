import { Vector3 } from 'three/src/math/Vector3';
import { UIBasicItem, type PaddingType } from './UIItem';
import { HorizontalAlignment } from './UIColumnItem';
import React from 'react';
type UITextProps = {
    text: string;
    textSize: number;
    textWidth: number;
    textAlign?: HorizontalAlignment;
    color?: number;
    padding?: number | PaddingType;
    id?: string;
};
/**
 * Subcomponent for InterfaceComponent that can display text.
 */
export declare class UITextItem extends UIBasicItem {
    text: string;
    textSize: number;
    textWidth: number;
    textHeight: number;
    textAlign: HorizontalAlignment;
    color: number;
    constructor(props: UITextProps);
    getWidth: () => number;
    getHeight: () => number;
    updateHeight: (newTextHeight: number) => boolean;
    static parseJson(uiJson: any, id: string, paddingLeft: number | undefined, paddingRight: number | undefined, paddingTop: number | undefined, paddingBottom: number | undefined): UITextItem | undefined;
    getComponent: (position: Vector3, updateParent: () => void) => React.JSX.Element;
}
export {};
