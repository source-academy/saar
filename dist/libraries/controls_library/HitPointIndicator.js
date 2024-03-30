"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitPointIndicator = void 0;
const xr_1 = require("@react-three/xr");
const react_1 = require("react");
const ControlsContext_1 = require("./ControlsContext");
const react_2 = __importDefault(require("react"));
/**
 * Basic indicator component for hit-test detected position.
 */
function HitPointIndicator(props) {
    const hitPointerRef = (0, react_1.useRef)(null);
    const controls = (0, ControlsContext_1.useControls)();
    (0, react_1.useEffect)(() => {
        if (hitPointerRef.current) {
            hitPointerRef.current.visible = props.isVisible;
            hitPointerRef.current.rotation.set(-Math.PI / 2, 0, 0); // Ensure that the ring is in right orientation
        }
    }, [hitPointerRef, props.isVisible]);
    return (react_2.default.createElement(xr_1.Interactive, null,
        react_2.default.createElement("mesh", { ref: hitPointerRef, "rotation-x": -Math.PI / 2, position: controls.hitPointPosition },
            react_2.default.createElement("ringGeometry", { args: [0, 0.05, 32] }),
            react_2.default.createElement("meshStandardMaterial", { color: 'white' }))));
}
exports.HitPointIndicator = HitPointIndicator;
