/// <reference types="webxr" />
import React from 'react';
type Props = {
    domOverlay: XRDOMOverlayInit | undefined;
    enterOnly?: boolean;
    exitOnly?: boolean;
};
/**
 * An AR button with features specified, to allow hit testing.
 */
export declare function SimplifiedARButton(props: Props): React.JSX.Element;
export {};
