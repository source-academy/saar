"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIBase64ImageItem = void 0;
const MeshLambertMaterial_1 = require("three/src/materials/MeshLambertMaterial");
const Texture_1 = require("three/src/textures/Texture");
const UIItem_1 = require("./UIItem");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const BASE64_IMAGE_UI_TYPE = 'UIBase64ImageItem';
/**
 * Subcomponent for InterfaceComponent that can display a Base64 encoded image.
 */
class UIBase64ImageItem extends UIItem_1.UIBasicItem {
    constructor(props) {
        super(BASE64_IMAGE_UI_TYPE, props.padding, props.id);
        this.getWidth = () => this.imageWidth + this.paddingLeft + this.paddingRight;
        this.getHeight = () => this.imageHeight + this.paddingTop + this.paddingBottom;
        this.getComponent = (position, _) => (react_2.default.createElement(Component, { key: this.id, component: this, position: position }));
        this.base64 = props.base64;
        this.imageWidth = props.imageWidth;
        this.imageHeight = props.imageHeight;
    }
    static parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom) {
        if (!uiJson || uiJson.type !== BASE64_IMAGE_UI_TYPE)
            return undefined;
        const base64 = uiJson.base64;
        const imageWidth = uiJson.imageWidth;
        const imageHeight = uiJson.imageHeight;
        if (typeof base64 === 'string' &&
            typeof imageWidth === 'number' &&
            typeof imageHeight === 'number') {
            return new UIBase64ImageItem({
                base64,
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
exports.UIBase64ImageItem = UIBase64ImageItem;
function Component(props) {
    const [material, setMaterial] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        // Loads the image onto a texture, then use it on a plane
        const image = new Image();
        image.src = props.component.base64;
        const texture = new Texture_1.Texture();
        texture.image = image;
        image.onload = () => {
            texture.needsUpdate = true;
        };
        const newMaterial = new MeshLambertMaterial_1.MeshLambertMaterial({ map: texture });
        setMaterial(newMaterial);
    }, [props.component.base64]);
    return (react_2.default.createElement("mesh", { key: `component_${props.component.id}`, position: props.position, material: material },
        react_2.default.createElement("planeGeometry", { args: [props.component.imageWidth, props.component.imageHeight] })));
}
