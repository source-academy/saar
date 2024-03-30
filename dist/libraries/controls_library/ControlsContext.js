"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useControls = exports.ControlsContext = void 0;
const fiber_1 = require("@react-three/fiber");
const react_1 = require("react");
const Quaternion_1 = require("three/src/math/Quaternion");
const Vector3_1 = require("three/src/math/Vector3");
const RayCast_1 = require("./RayCast");
const xr_1 = require("@react-three/xr");
const react_2 = __importDefault(require("react"));
const Context = (0, react_1.createContext)({
    hitPointPosition: new Vector3_1.Vector3(),
    objectInSight: (0, react_1.createRef)(),
    setObjectInSightCallback() { },
});
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
function ControlsContext(props) {
    const three = (0, fiber_1.useThree)();
    // Hit Test
    const [hitPointPosition, setHitPointPosition] = (0, react_1.useState)(new Vector3_1.Vector3());
    (0, xr_1.useHitTest)((hitMatrix, _) => {
        const newPosition = new Vector3_1.Vector3();
        const newRotation = new Quaternion_1.Quaternion();
        const newScale = new Vector3_1.Vector3();
        hitMatrix.decompose(newPosition, newRotation, newScale);
        setHitPointPosition(newPosition);
    });
    // Ray Cast
    const objectInSight = (0, react_1.useRef)(undefined);
    const objectInSightCallback = (0, react_1.useRef)();
    (0, fiber_1.useFrame)((_state, _delta) => {
        var _a, _b, _c;
        const item = (0, RayCast_1.getIntersection)(three.camera, three.scene);
        if (item === undefined && objectInSight.current !== undefined) {
            // Object -> Null
            const prev = objectInSight.current;
            objectInSight.current = undefined;
            (_a = objectInSightCallback.current) === null || _a === void 0 ? void 0 : _a.call(objectInSightCallback, prev, undefined);
        }
        else if (item !== undefined &&
            ((_b = objectInSight.current) === null || _b === void 0 ? void 0 : _b.uuid) !== item.uuid) {
            // Null -> Object or Old Object -> New Object
            const prev = objectInSight.current;
            objectInSight.current = item;
            (_c = objectInSightCallback.current) === null || _c === void 0 ? void 0 : _c.call(objectInSightCallback, prev, item);
        }
    });
    return (react_2.default.createElement(Context.Provider, { value: {
            hitPointPosition,
            objectInSight,
            setObjectInSightCallback(newCallback) {
                objectInSightCallback.current = newCallback;
            },
        } }, props.children));
}
exports.ControlsContext = ControlsContext;
function useControls() {
    return (0, react_1.useContext)(Context);
}
exports.useControls = useControls;
