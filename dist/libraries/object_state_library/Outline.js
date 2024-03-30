"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outline = void 0;
const drei_1 = require("@react-three/drei");
const three_1 = require("three");
const react_1 = __importDefault(require("react"));
/**
 * Outline for ARObject.
 * Currently only works with UI and shape objects.
 */
function Outline(props) {
    function getColor() {
        if (props.isSelected && props.isInFront) {
            return new three_1.Color(0x00ff73);
        }
        if (props.isSelected) {
            return new three_1.Color(0xff5900);
        }
        return new three_1.Color(0xffa500);
    }
    return (react_1.default.createElement(drei_1.Outlines, { visible: props.isInFront || props.isSelected, thickness: 10, color: getColor(), screenspace: true, opacity: 1, transparent: false, angle: 0 }));
}
exports.Outline = Outline;
