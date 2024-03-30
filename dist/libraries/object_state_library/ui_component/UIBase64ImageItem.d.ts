import { type Vector3 } from 'three/src/math/Vector3';
import { UIBasicItem, type PaddingType } from './UIItem';
import React from 'react';
type UIBase64ImageProps = {
    base64: string;
    imageWidth: number;
    imageHeight: number;
    padding?: number | PaddingType;
    id?: string;
};
/**
 * Subcomponent for InterfaceComponent that can display a Base64 encoded image.
 */
export declare class UIBase64ImageItem extends UIBasicItem {
    base64: string;
    imageWidth: number;
    imageHeight: number;
    constructor(props: UIBase64ImageProps);
    getWidth: () => number;
    getHeight: () => number;
    static parseJson(uiJson: any, id: string, paddingLeft: number | undefined, paddingRight: number | undefined, paddingTop: number | undefined, paddingBottom: number | undefined): UIBase64ImageItem | undefined;
    getComponent: (position: Vector3, _: () => void) => React.JSX.Element;
}
export {};
