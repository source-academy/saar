"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeComponent = void 0;
const three_1 = require("@react-spring/three");
const Outline_1 = require("../Outline");
const react_1 = __importDefault(require("react"));
/**
 * Component for showing a Three.js shape.
 */
function ShapeComponent(props) {
    return (react_1.default.createElement(three_1.animated.mesh, { ref: props.meshRef, position: props.springPosition },
        react_1.default.createElement("mesh", { geometry: props.shapeModel.geometry, material: props.shapeModel.material },
            react_1.default.createElement(Outline_1.Outline, { isSelected: props.isSelected, isInFront: props.isInFront }))));
}
exports.ShapeComponent = ShapeComponent;
