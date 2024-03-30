"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayArea = exports.PlayAreaContext = void 0;
const fiber_1 = require("@react-three/fiber");
const react_1 = require("react");
const Euler_1 = require("three/src/math/Euler");
const Vector3_1 = require("three/src/math/Vector3");
const react_2 = __importDefault(require("react"));
const Context = (0, react_1.createContext)({
    setCameraAsOrigin() { },
    setPositionAsOrigin() { },
    getCameraPosition: () => new Vector3_1.Vector3(),
    getCameraRotation: () => new Euler_1.Euler(),
});
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
function PlayAreaContext(props) {
    const [origin, setOrigin] = (0, react_1.useState)(new Vector3_1.Vector3(0, 0, 0));
    const [angle, setAngle] = (0, react_1.useState)(0);
    const three = (0, fiber_1.useThree)();
    const DEFAULT_HEIGHT = 1;
    /**
     * Sets the current position as origin.
     */
    function setCameraAsOrigin() {
        const cameraPosition = three.camera.position;
        setPositionAsOrigin(new Vector3_1.Vector3(cameraPosition.x, cameraPosition.y - DEFAULT_HEIGHT, cameraPosition.z), three.camera.rotation);
    }
    /**
     * Sets the origin position and angle for calibration.
     * Relative to actual world origin.
     * Converts camera rotation to angle around vertical axis.
     * Angle measured counterclockwise, starting from 12 o'clock.
     *
     * @param position Position of user in world coordinates
     * @param rotation Camera rotation of user
     */
    function setPositionAsOrigin(position, rotation) {
        setOrigin(position);
        setAngle(eulerToAngle(rotation));
    }
    /**
     * Returns the current camera position relative to the origin.
     */
    function getCameraPosition() {
        return getRelativePosition(three.camera.position);
    }
    /**
     * Returns the current camera rotation relative to the origin.
     */
    function getCameraRotation() {
        return getRelativeRotation(three.camera.rotation);
    }
    // Logic
    /**
     * Converts euler to y-axis rotation angle.
     *
     * @param euler Euler to convert
     * @returns Angle in radians
     */
    function eulerToAngle(euler) {
        const x = Math.sin(euler.y);
        const z = Math.cos(euler.y) * Math.cos(euler.x);
        let selectedAngle = 0;
        if (z !== 0) {
            selectedAngle = Math.atan(x / z);
            if (z < 0) {
                selectedAngle += Math.PI;
            }
            else if (x < 0) {
                selectedAngle += Math.PI * 2;
            }
        }
        else if (x > 0) {
            selectedAngle = Math.PI / 2;
        }
        else if (x < 0) {
            selectedAngle = (Math.PI * 3) / 2;
        }
        return selectedAngle;
    }
    /**
     * Converts actual position to position relative to the custom origin position.
     *
     * @param position Actual position tracked by camera
     * @returns Position relative to the custom origin
     */
    function getRelativePosition(position) {
        const x = position.x - origin.x;
        const y = position.y - origin.y;
        const z = position.z - origin.z;
        const relativePosition = new Vector3_1.Vector3(x, y, z);
        relativePosition.applyAxisAngle(new Vector3_1.Vector3(0, 1, 0), -angle); // Rotation fixed around vertical axis
        return relativePosition;
    }
    /**
     * Converts actual rotation to rotation relative to the custom origin angle.
     *
     * @param rotation Actual rotation tracked by camera
     * @returns Rotation relative to the custom origin
     */
    function getRelativeRotation(rotation) {
        const vector3 = new Vector3_1.Vector3();
        vector3.setFromEuler(rotation);
        vector3.applyAxisAngle(new Vector3_1.Vector3(0, 1, 0), -angle);
        const euler = new Euler_1.Euler();
        euler.setFromVector3(vector3);
        return euler;
    }
    return (react_2.default.createElement(Context.Provider, { value: {
            setCameraAsOrigin,
            setPositionAsOrigin,
            getCameraPosition,
            getCameraRotation,
        } },
        react_2.default.createElement("group", { position: origin, rotation: new Euler_1.Euler(0, angle, 0) }, props.children)));
}
exports.PlayAreaContext = PlayAreaContext;
function usePlayArea() {
    return (0, react_1.useContext)(Context);
}
exports.usePlayArea = usePlayArea;
