"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIRowItem = exports.VerticalAlignment = void 0;
const react_1 = require("react");
const UIItem_1 = require("./UIItem");
const three_1 = require("three");
const react_2 = __importDefault(require("react"));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
})(VerticalAlignment || (exports.VerticalAlignment = VerticalAlignment = {}));
const ROW_UI_TYPE = 'UIRowItem';
/**
 * Row layout subcomponent for InterfaceComponent.
 */
class UIRowItem extends UIItem_1.UILayoutItem {
    constructor(props) {
        var _a;
        super(ROW_UI_TYPE, props.padding, props.id);
        this.getWidth = () => {
            let width = this.paddingLeft + this.paddingRight;
            this.children.forEach((item) => {
                item.calculateLayer();
                width += item.getWidth();
            });
            return width;
        };
        this.getHeight = () => {
            const height = this.paddingTop + this.paddingBottom;
            let maxChildHeight = 0;
            this.children.forEach((item) => {
                item.calculateLayer();
                maxChildHeight = Math.max(maxChildHeight, item.getHeight());
            });
            return height + maxChildHeight;
        };
        this.getComponent = (position, updateParent) => (react_2.default.createElement(Component, { key: this.id, component: this, position: position, updateParent: updateParent }));
        this.background = (_a = props.backgroundColor) !== null && _a !== void 0 ? _a : 0xffffff;
        if (props.children) {
            this.children = props.children;
        }
        if (props.verticalAlignment !== undefined) {
            this.verticalAlignment = props.verticalAlignment;
        }
        else {
            this.verticalAlignment = VerticalAlignment.Middle;
        }
        this.calculateLayer();
    }
    static parseJson(uiJson, id, paddingLeft, paddingRight, paddingTop, paddingBottom, parseJsonInterface) {
        if (!uiJson || uiJson.type !== ROW_UI_TYPE)
            return undefined;
        const verticalAlignmentIndex = uiJson.verticalAlignment;
        let verticalAlignment = VerticalAlignment.Top;
        if (typeof verticalAlignmentIndex === 'number') {
            const parsedIndex = Math.min(Math.max(0, verticalAlignmentIndex), 2);
            verticalAlignment = parsedIndex;
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
        return new UIRowItem({
            children,
            verticalAlignment,
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
exports.UIRowItem = UIRowItem;
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
        let currentXPosition = -componentWidth / 2 + component.paddingLeft;
        for (let i = 0; i < component.children.length; i++) {
            const child = component.children[i];
            const childHeight = child.getHeight();
            const childWidth = child.getWidth();
            const relativeXPosition = currentXPosition +
                childWidth / 2 +
                (child.paddingLeft - child.paddingRight) / 2;
            currentXPosition += childWidth;
            let relativeYPosition = -(child.paddingTop - child.paddingBottom) / 2;
            if (component.verticalAlignment === VerticalAlignment.Top) {
                relativeYPosition +=
                    (componentHeight - childHeight) / 2 - component.paddingTop;
            }
            else if (component.verticalAlignment === VerticalAlignment.Bottom) {
                relativeYPosition +=
                    -(componentHeight - childHeight) / 2 - component.paddingBottom;
            }
            const childPosition = new three_1.Vector3(relativeXPosition, relativeYPosition, 0);
            positions.push(childPosition);
        }
        setComponentPositions(positions);
    }
    function ChildrenComponents(childProps) {
        if (childProps.componentPositions.length !== component.children.length) {
            updateChildrenAlignment();
            return null;
        }
        const children = [];
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
