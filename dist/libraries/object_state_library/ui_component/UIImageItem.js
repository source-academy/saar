"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIImageItem = void 0;
const UIItem_1 = require("./UIItem");
const drei_1 = require("@react-three/drei");
const react_1 = __importDefault(require("react"));
const IMAGE_UI_TYPE = 'UIImageItem';
/**
 * Subcomponent for InterfaceComponent that can display an image from a link.
 */
class UIImageItem extends UIItem_1.UIBasicItem {
    constructor(props) {
        super(IMAGE_UI_TYPE, props.padding, props.id);
        this.getWidth = () => this.imageWidth + this.paddingLeft + this.paddingRight;
        this.getHeight = () => this.imageHeight + this.paddingTop + this.paddingBottom;
        this.getComponent = (position, _) => (react_1.default.createElement(Component, { key: this.id, component: this, position: position }));
        this.src = props.src;
        this.imageWidth = props.imageWidth;
        this.imageHeight = props.imageHeight;
    }
    static parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom) {
        if (!uiJson || uiJson.type !== IMAGE_UI_TYPE)
            return undefined;
        const src = uiJson.src;
        const imageWidth = uiJson.imageWidth;
        const imageHeight = uiJson.imageHeight;
        if (typeof src === 'string' &&
            typeof imageWidth === 'number' &&
            typeof imageHeight === 'number') {
            return new UIImageItem({
                src,
                imageWidth,
                imageHeight,
                padding: {
                    paddingLeft,
                    paddingRight,
                    paddingTop,
                    paddingBottom,
                },
                id,
            });
        }
        return undefined;
    }
}
exports.UIImageItem = UIImageItem;
function Component(props) {
    const { component, position } = props;
    return (react_1.default.createElement("mesh", { key: `component_${component.id}`, position: position },
        react_1.default.createElement(drei_1.Image, { url: component.src, scale: [component.getWidth(), component.getHeight()] })));
}
