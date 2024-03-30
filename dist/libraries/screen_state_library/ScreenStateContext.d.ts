/// <reference types="webxr" />
import React from 'react';
type ContextType = {
    overlayRef: React.RefObject<HTMLDivElement> | null;
    domOverlay: XRDOMOverlayInit | undefined;
    setState: (arState: JSX.Element, overlayState: JSX.Element) => void;
    component: JSX.Element;
};
type Props = {
    children: JSX.Element;
};
/**
 * Parent component with screen state context.
 * Used for managing ar content and its corresponding overlay.
 *
 * Steps to use:
 * 1. Add 'domOverlay' to sessionInit of AR toggle.
 * 2. Add 'component' as a child of this ScreenStateContext.
 * 3. Call 'setStates' to set all possible screen states.
 * 4. The first screen state in the map is used by default.
 * 5. To switch screen states, call 'setSelectedState' with the new state's key.
 * 6. Use 'overlayRef' to interact with the existing overlay.
 *
 * Components within it can call 'useScreenState' to obtain this context.
 */
export declare function ScreenStateContext(props: Props): JSX.Element;
export declare function useScreenState(): ContextType;
export {};
