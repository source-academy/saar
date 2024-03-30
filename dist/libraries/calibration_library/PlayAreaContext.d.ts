/// <reference types="react" />
import { Euler } from 'three/src/math/Euler';
import { Vector3 } from 'three/src/math/Vector3';
type ContextType = {
    setCameraAsOrigin: () => void;
    setPositionAsOrigin: (origin: Vector3, cameraRotation: Euler) => void;
    getCameraPosition: () => Vector3;
    getCameraRotation: () => Euler;
};
type Props = {
    children: JSX.Element;
};
/**
 * Parent component with play area context.
 * Allows for resetting the point and angle of origin.
 * Also provides translated camera position and rotation.
 *
 * Steps to use:
 * 1a. Call 'setCameraAsOrigin' to set current position as new origin position and angle.
 * 1b. Alternatively, call 'setPlayArea' with the position + rotation to set as new origin position and angle.
 *
 * Components within it can call 'usePlayArea' to obtain this context.
 */
export declare function PlayAreaContext(props: Props): JSX.Element;
export declare function usePlayArea(): ContextType;
export {};
