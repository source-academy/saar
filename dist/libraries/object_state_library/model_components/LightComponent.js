"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightComponent = void 0;
const three_1 = require("@react-spring/three");
const react_1 = __importDefault(require("react"));
/**
 * Component for a light source shining from a particular positon.
 */
function LightComponent(props) {
    return (react_1.default.createElement(three_1.animated.mesh, { ref: props.meshRef, position: props.springPosition },
        react_1.default.createElement("pointLight", { intensity: props.lightModel.intensity })));
}
exports.LightComponent = LightComponent;
