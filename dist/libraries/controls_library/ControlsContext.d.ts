import { type Mesh, Vector3 } from 'three';
import React from 'react';
type ContextType = {
    hitPointPosition: Vector3;
    objectInSight: React.MutableRefObject<any>;
    setObjectInSightCallback: (callback: (prev: Mesh | undefined, current: Mesh | undefined) => void) => void;
};
type Props = {
    children: JSX.Element;
};
/**
 * Parent component with controls context.
 * Allows for more ways of interacting with objects.
 *
 * --- Hit Test ---
 * This feature can detect a surface shown on the screen and provide its coordinates.
 *
 * Steps to use:
 * 1. Replace the normal ARButton with the SimplifiedARButton.
 * 2. Add HitPointIndicator as a component in your virtual world to show the indicator on screen.
 * 3. Read `hitPointPosition` for the position of the latest surface detected.
 *
 * --- Ray Cast ---
 * This feature allows for identifying the first object in the middle of the screen.
 *
 * Steps to use:
 * 1. Provide a callback for receiving updates using 'setObjectInSightCallback'.
 * 2. In the callback, use the previous and current object to do something.
 *
 * Components within it can call 'useControls' to obtain this context.
 */
export declare function ControlsContext(props: Props): JSX.Element;
export declare function useControls(): ContextType;
export {};
