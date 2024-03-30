import { type Vector3 } from 'three/src/math/Vector3';
import { UIBasicItem, type PaddingType } from './UIItem';
import React from 'react';
type UIImageProps = {
    src: string;
    imageWidth: number;
    imageHeight: number;
    padding?: number | PaddingType;
    id?: string;
};
/**
 * Subcomponent for InterfaceComponent that can display an image from a link.
 */
export declare class UIImageItem extends UIBasicItem {
    src: string;
    imageWidth: number;
    imageHeight: number;
    constructor(props: UIImageProps);
    getWidth: () => number;
    getHeight: () => number;
    static parseJson(uiJson: any, id: string, paddingLeft: number | undefined, paddingRight: number | undefined, paddingTop: number | undefined, paddingBottom: number | undefined): UIImageItem | undefined;
    getComponent: (position: Vector3, _: () => void) => React.JSX.Element;
}
export {};
