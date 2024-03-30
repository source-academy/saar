"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIColumnItem = exports.HorizontalAlignment = void 0;
const react_1 = require("react");
const UIItem_1 = require("./UIItem");
const three_1 = require("three");
const react_2 = __importDefault(require("react"));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
    HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
    HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
})(HorizontalAlignment || (exports.HorizontalAlignment = HorizontalAlignment = {}));
const COLUMN_UI_TYPE = 'UIColumnItem';
/**
 * Column layout subcomponent for InterfaceComponent.
 */
class UIColumnItem extends UIItem_1.UILayoutItem {
    constructor(props) {
        var _a;
        super(COLUMN_UI_TYPE, props.padding, props.id);
        this.getWidth = () => {
            const width = this.paddingLeft + this.paddingRight;
            let maxChildWidth = 0;
            this.children.forEach((item) => {
                item.calculateLayer();
                maxChildWidth = Math.max(maxChildWidth, item.getWidth());
            });
            return width + maxChildWidth;
        };
        this.getHeight = () => {
            let height = this.paddingTop + this.paddingBottom;
            this.children.forEach((item) => {
                item.calculateLayer();
                height += item.getHeight();
            });
            return height;
        };
        this.getComponent = (position, updateParent) => (react_2.default.createElement(Component, { key: this.id, component: this, position: position, updateParent: updateParent }));
        this.background = (_a = props.backgroundColor) !== null && _a !== void 0 ? _a : 0xffffff;
        if (props.children) {
            this.children = props.children;
        }
        if (props.horizontalAlignment !== undefined) {
            this.horizontalAlignment = props.horizontalAlignment;
        }
        else {
            this.horizontalAlignment = HorizontalAlignment.Center;
        }
        this.calculateLayer();
    }
    static parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom, parseJsonInterface) {
        if (!uiJson || uiJson.type !== COLUMN_UI_TYPE)
            return undefined;
        const horizontalAlignmentIndex = uiJson.horizontalAlignment;
        let horizontalAlignment = HorizontalAlignment.Left;
        if (typeof horizontalAlignmentIndex === 'number') {
            const parsedIndex = Math.min(Math.max(0, horizontalAlignmentIndex), 2);
            horizontalAlignment = parsedIndex;
        }
        const children = [];
        const jsonChildren = uiJson.children;
        if (Array.isArray(jsonChildren)) {
            jsonChildren.forEach((jsonChild) => {
                const child = parseJsonInterface(jsonChild);
                if (child) {
                    children.push(child);
                }
            });
        }
        let backgroundColor = uiJson.background;
        if (typeof backgroundColor !== 'number') {
            backgroundColor = undefined;
        }
        return new UIColumnItem({
            children,
            horizontalAlignment,
            padding: {
                paddingLeft,
                paddingRight,
                paddingTop,
                paddingBottom,
            },
            backgroundColor,
            id,
        });
    }
}
exports.UIColumnItem = UIColumnItem;
function Component(props) {
    const { component, position, updateParent } = props;
    const [width, setWidth] = (0, react_1.useState)(component.getWidth());
    const [height, setHeight] = (0, react_1.useState)(component.getHeight());
    const [componentPositions, setComponentPositions] = (0, react_1.useState)([]);
    /**
     * Updates the height and width, to adapt to children size.
     * Need to realign children items after updating.
     */
    function updateSize() {
        const previousHeight = height;
        const previousWidth = width;
        const newHeight = component.getHeight();
        const newWidth = component.getWidth();
        setHeight(newHeight);
        setWidth(newWidth);
        updateChildrenAlignment();
        if (previousHeight !== newHeight || previousWidth !== newWidth) {
            updateParent();
        }
    }
    /**
     * Realign children items depending on the specified alignment.
     */
    function updateChildrenAlignment() {
        const positions = [];
        const componentHeight = component.getHeight();
        const componentWidth = component.getWidth();
        let currentYPosition = -componentHeight / 2 + component.paddingTop;
        for (let i = 0; i < component.children.length; i++) {
            const child = component.children[i];
            const childHeight = child.getHeight();
            const childWidth = child.getWidth();
            const relativeYPosition = currentYPosition +
                childHeight / 2 +
                (child.paddingTop - child.paddingBottom) / 2;
            currentYPosition += childHeight;
            let relativeXPosition = (child.paddingLeft - child.paddingRight) / 2;
            if (component.horizontalAlignment === HorizontalAlignment.Left) {
                relativeXPosition +=
                    -(componentWidth - childWidth) / 2 + component.paddingLeft;
            }
            else if (component.horizontalAlignment === HorizontalAlignment.Right) {
                relativeXPosition +=
                    (componentWidth - childWidth) / 2 - component.paddingRight;
            }
            const childPosition = new three_1.Vector3(relativeXPosition, -relativeYPosition, 0);
            positions.push(childPosition);
        }
        setComponentPositions(positions);
    }
    function ChildrenComponents(childProps) {
        if (childProps.componentPositions.length !== component.children.length) {
            updateChildrenAlignment();
            return null;
        }
        let children = [];
        for (let i = 0; i < component.children.length; i++) {
            const child = component.children[i];
            const childPosition = childProps.componentPositions[i];
            children.push(react_2.default.createElement("group", { key: `component_${component.id}child_${i}` }, child.getComponent(childPosition, updateSize)));
        }
        return react_2.default.createElement("group", { key: `children_${component.id}` }, children);
    }
    return (react_2.default.createElement("mesh", { key: `component_${component.id}`, position: position },
        react_2.default.createElement("mesh", { position: new three_1.Vector3(0, 0, -component.layer / 1000) },
            react_2.default.createElement("boxGeometry", { args: [width, height, 0] }),
            react_2.default.createElement("meshBasicMaterial", { color: new three_1.Color(component.background) })),
        react_2.default.createElement(ChildrenComponents, { componentPositions: componentPositions })));
}
