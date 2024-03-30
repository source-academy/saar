"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UILayoutItem = exports.UIBasicItem = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const react_1 = __importDefault(require("react"));
/**
 * Base class for a subcomponent in InterfaceComponent.
 */
class UIBasicItem {
    constructor(type, padding, id) {
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.paddingBottom = 0;
        this.id = '';
        this.layer = 1;
        this.parent = undefined;
        this.toJSON = () => {
            let object = Object.assign({}, this);
            delete object.layer;
            delete object.parent;
            return object;
        };
        this.getWidth = () => this.paddingLeft + this.paddingRight;
        this.getHeight = () => this.paddingTop + this.paddingBottom;
        this.calculateLayer = () => { };
        this.getComponent = (position, _) => (react_1.default.createElement("mesh", { key: `component_${this.id}`, position: position }));
        this.type = type;
        if (padding) {
            if (typeof padding === 'number') {
                this.paddingLeft = padding;
                this.paddingRight = padding;
                this.paddingTop = padding;
                this.paddingBottom = padding;
            }
            else {
                if (padding.paddingLeft) {
                    this.paddingLeft = padding.paddingLeft;
                }
                if (padding.paddingRight) {
                    this.paddingRight = padding.paddingRight;
                }
                if (padding.paddingTop) {
                    this.paddingTop = padding.paddingTop;
                }
                if (padding.paddingBottom) {
                    this.paddingBottom = padding.paddingBottom;
                }
            }
        }
        if (id) {
            this.id = id;
        }
        else {
            this.id = (0, uniqid_1.default)();
        }
    }
}
exports.UIBasicItem = UIBasicItem;
/**
 * Class for a layout subcomponent in InterfaceComponent.
 */
class UILayoutItem extends UIBasicItem {
    constructor() {
        super(...arguments);
        this.children = [];
        this.calculateLayer = () => {
            this.layer = 1;
            this.children.forEach((child) => {
                if (child instanceof UILayoutItem && this.layer <= child.layer) {
                    this.layer = child.layer + 1;
                }
            });
            this.children.forEach((child) => {
                child.parent = this;
            });
        };
    }
}
exports.UILayoutItem = UILayoutItem;
