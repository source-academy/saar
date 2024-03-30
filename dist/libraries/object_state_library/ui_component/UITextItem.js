"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UITextItem = void 0;
const Color_1 = require("three/src/math/Color");
const Vector3_1 = require("three/src/math/Vector3");
const UIItem_1 = require("./UIItem");
const drei_1 = require("@react-three/drei");
const react_1 = require("react");
const UIColumnItem_1 = require("./UIColumnItem");
const react_2 = __importDefault(require("react"));
const TEXT_UI_TYPE = 'UITextItem';
/**
 * Subcomponent for InterfaceComponent that can display text.
 */
class UITextItem extends UIItem_1.UIBasicItem {
    constructor(props) {
        var _a, _b;
        super(TEXT_UI_TYPE, props.padding, props.id);
        this.textHeight = 0;
        this.getWidth = () => this.textWidth + this.paddingLeft + this.paddingRight;
        this.getHeight = () => this.textHeight + this.paddingTop + this.paddingBottom;
        this.updateHeight = (newTextHeight) => {
            // Returns whether height changed
            const oldHeight = this.getHeight();
            this.textHeight = newTextHeight;
            const newHeight = this.getHeight();
            if (oldHeight !== newHeight) {
                return true;
            }
            return false;
        };
        this.getComponent = (position, updateParent) => (react_2.default.createElement(Component, { key: this.id, component: this, position: position, updateParent: updateParent }));
        this.text = props.text;
        this.textSize = props.textSize;
        this.textWidth = props.textWidth;
        this.textAlign = (_a = props.textAlign) !== null && _a !== void 0 ? _a : UIColumnItem_1.HorizontalAlignment.Left;
        this.color = (_b = props.color) !== null && _b !== void 0 ? _b : 0;
    }
    static parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom) {
        if (!uiJson || uiJson.type !== TEXT_UI_TYPE)
            return undefined;
        const text = uiJson.text;
        const textSize = uiJson.textSize;
        const textWidth = uiJson.textWidth;
        const textAlign = uiJson.textAlign;
        const color = uiJson.color;
        if (typeof text === 'string' &&
            typeof textSize === 'number' &&
            typeof textWidth === 'number' &&
            typeof color === 'number') {
            return new UITextItem({
                text,
                textSize,
                textWidth,
                textAlign,
                color,
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
exports.UITextItem = UITextItem;
function Component(props) {
    let { component, position, updateParent } = props;
    const [offsetX, setOffsetX] = (0, react_1.useState)(0);
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        if (ref.current) {
            getSize();
        }
    }, [ref]);
    /**
     * Obtains the actual size of text.
     * Size is 0 until text is loaded.
     */
    function getSize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (ref.current) {
                const geometry = ref.current.geometry;
                geometry.computeBoundingBox();
                if (geometry.boundingBox) {
                    const minY = geometry.boundingBox.min.y;
                    const maxY = geometry.boundingBox.max.y;
                    const textHeight = maxY - minY;
                    const minX = geometry.boundingBox.min.x;
                    const maxX = geometry.boundingBox.max.x;
                    const textWidth = maxX - minX;
                    if (Number.isFinite(textHeight) && Number.isFinite(textWidth)) {
                        if (component.updateHeight(textHeight)) {
                            updateParent();
                        }
                        const offsetMagnitude = (component.textWidth - textWidth) / 2;
                        if (offsetMagnitude <= 0)
                            return;
                        if (component.textAlign === UIColumnItem_1.HorizontalAlignment.Left) {
                            setOffsetX(-offsetMagnitude);
                        }
                        else if (component.textAlign === UIColumnItem_1.HorizontalAlignment.Right) {
                            setOffsetX(offsetMagnitude);
                        }
                    }
                    else {
                        setTimeout(() => {
                            getSize();
                        }, 100);
                    }
                }
                else {
                    setTimeout(() => {
                        getSize();
                    }, 100);
                }
            }
        });
    }
    /**
     * Converts alignment to equibalent text alignment string.
     */
    function getTextAlign(alignment) {
        switch (alignment) {
            case UIColumnItem_1.HorizontalAlignment.Left:
                return 'left';
            case UIColumnItem_1.HorizontalAlignment.Right:
                return 'right';
        }
        return 'center';
    }
    return (react_2.default.createElement("mesh", { key: `component_${component.id}`, position: position },
        react_2.default.createElement(drei_1.Text, { position: new Vector3_1.Vector3(offsetX, 0, 0), ref: ref, fontSize: component.textSize, maxWidth: component.textWidth, textAlign: getTextAlign(component.textAlign), color: new Color_1.Color(component.color), overflowWrap: "normal" }, component.text)));
}
