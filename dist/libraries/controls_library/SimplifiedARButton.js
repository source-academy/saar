"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplifiedARButton = void 0;
const xr_1 = require("@react-three/xr");
const react_1 = __importDefault(require("react"));
/**
 * An AR button with features specified, to allow hit testing.
 */
function SimplifiedARButton(props) {
    return (react_1.default.createElement(xr_1.ARButton, { sessionInit: {
            requiredFeatures: ['hit-test'],
            optionalFeatures: ['dom-overlay'],
            domOverlay: props.domOverlay,
        }, enterOnly: props.enterOnly, exitOnly: props.exitOnly }));
}
exports.SimplifiedARButton = SimplifiedARButton;
