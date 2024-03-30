"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonInterface = exports.InterfaceComponent = void 0;
const three_1 = require("@react-spring/three");
const react_1 = require("react");
const Outline_1 = require("../Outline");
const three_2 = require("three");
const UIColumnItem_1 = require("../ui_component/UIColumnItem");
const UIRowItem_1 = require("../ui_component/UIRowItem");
const UITextItem_1 = require("../ui_component/UITextItem");
const UIImageItem_1 = require("../ui_component/UIImageItem");
const UIBase64ImageItem_1 = require("../ui_component/UIBase64ImageItem");
const react_2 = __importDefault(require("react"));
/**
 * Component for showing floating UI.
 */
function InterfaceComponent(props) {
    const [components, setComponents] = (0, react_1.useState)();
    const [width, setWidth] = (0, react_1.useState)(0);
    const [height, setHeight] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e;
        setWidth((_b = (_a = props.interfaceModel.rootComponent) === null || _a === void 0 ? void 0 : _a.getWidth()) !== null && _b !== void 0 ? _b : 0);
        setHeight((_d = (_c = props.interfaceModel.rootComponent) === null || _c === void 0 ? void 0 : _c.getHeight()) !== null && _d !== void 0 ? _d : 0);
        setComponents((_e = props.interfaceModel.rootComponent) === null || _e === void 0 ? void 0 : _e.getComponent(new three_2.Vector3(0), () => {
            var _a, _b, _c, _d;
            setWidth((_b = (_a = props.interfaceModel.rootComponent) === null || _a === void 0 ? void 0 : _a.getWidth()) !== null && _b !== void 0 ? _b : 0);
            setHeight((_d = (_c = props.interfaceModel.rootComponent) === null || _c === void 0 ? void 0 : _c.getHeight()) !== null && _d !== void 0 ? _d : 0);
        }));
    }, [props.interfaceModel.rootComponent]);
    return (react_2.default.createElement(three_1.animated.mesh, { ref: props.meshRef, position: props.springPosition },
        react_2.default.createElement("mesh", { position: new three_2.Vector3(0, 0, -1 / 1000) },
            react_2.default.createElement(Outline_1.Outline, { isSelected: props.isSelected, isInFront: props.isInFront }),
            react_2.default.createElement("boxGeometry", { args: [width + 0.01, height + 0.01, 0] }),
            react_2.default.createElement("meshStandardMaterial", { transparent: true, opacity: 0 })),
        components));
}
exports.InterfaceComponent = InterfaceComponent;
/**
 * Parses the json of an interface back to the original classes.
 * Used for restoring the UI after json conversion.
 *
 * @param uiJson Json of the UI to show
 */
function parseJsonInterface(uiJson) {
    if (!uiJson) {
        return undefined;
    }
    const id = uiJson.id;
    const paddingLeft = uiJson.paddingLeft;
    const paddingRight = uiJson.paddingRight;
    const paddingTop = uiJson.paddingTop;
    const paddingBottom = uiJson.paddingBottom;
    if (typeof id !== 'string' ||
        typeof paddingLeft !== 'number' ||
        typeof paddingRight !== 'number' ||
        typeof paddingTop !== 'number' ||
        typeof paddingBottom !== 'number') {
        return undefined;
    }
    const columnItem = UIColumnItem_1.UIColumnItem.parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom, parseJsonInterface);
    if (columnItem) {
        return columnItem;
    }
    const rowItem = UIRowItem_1.UIRowItem.parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom, parseJsonInterface);
    if (rowItem) {
        return rowItem;
    }
    const textItem = UITextItem_1.UITextItem.parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom);
    if (textItem) {
        return textItem;
    }
    const imageItem = UIImageItem_1.UIImageItem.parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom);
    if (imageItem) {
        return imageItem;
    }
    const base64ImageItem = UIBase64ImageItem_1.UIBase64ImageItem.parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom);
    if (base64ImageItem) {
        return base64ImageItem;
    }
    return undefined;
}
exports.parseJsonInterface = parseJsonInterface;
