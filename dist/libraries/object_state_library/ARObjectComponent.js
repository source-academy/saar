"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARObjectComponent = void 0;
const xr_1 = require("@react-three/xr");
const react_1 = require("react");
const Behaviour_1 = require("./Behaviour");
const three_1 = require("three");
const fiber_1 = require("@react-three/fiber");
const ErrorBoundary_1 = __importDefault(require("./ErrorBoundary"));
const GltfComponent_1 = require("./model_components/GltfComponent");
const ShapeComponent_1 = require("./model_components/ShapeComponent");
const three_2 = require("@react-spring/three");
const LightComponent_1 = require("./model_components/LightComponent");
const InterfaceComponent_1 = require("./model_components/InterfaceComponent");
const Misc_1 = require("./Misc");
const react_2 = __importDefault(require("react"));
/**
 * Component for showing a single AR object.
 * Use translatePosition and translateRotation if callibration is required.
 */
function ARObjectComponent(props) {
    const ref = (0, react_1.useRef)(null);
    const [showComponent, setShowComponent] = (0, react_1.useState)(false);
    const [targetPosition, setTargetPosition] = (0, react_1.useState)(props.arObject.position);
    const spring = (0, three_2.useSpring)({
        position: (0, Misc_1.vector3ToArray)(targetPosition),
    });
    const [isInFront, setInFront] = (0, react_1.useState)(false);
    (0, fiber_1.useFrame)((_, delta) => {
        var _a;
        // Obtain mesh id once ref is ready
        let uuid = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.uuid;
        if (uuid) {
            props.setUUID(uuid);
        }
        // Updates state of whether object is in front
        if (isInFront !== props.arObject.isInFront) {
            setInFront(props.arObject.isInFront);
        }
        // Updates state of object every frame, based on selected behaviour
        const currentPosition = updatePosition(props.arObject, ref, targetPosition, setTargetPosition);
        const userPosition = props.getUserPosition();
        handleVisibility(props.arObject, currentPosition, userPosition, setShowComponent);
        handleRotation(props.arObject, currentPosition, userPosition, ref, delta);
    });
    if (!showComponent)
        return null;
    return (react_2.default.createElement(ErrorBoundary_1.default, { fallback: react_2.default.createElement(react_2.default.Fragment, null) },
        react_2.default.createElement(xr_1.Interactive, { onSelect: () => {
                let onSelect = props.onSelect;
                if (onSelect) {
                    onSelect(props.arObject);
                }
            } },
            react_2.default.createElement(ModelComponent, { arObject: props.arObject, meshRef: ref, children: props.children, springPosition: spring.position, isSelected: props.arObject.isSelected, isInFront: isInFront }))));
}
exports.ARObjectComponent = ARObjectComponent;
// Movement
/**
 * Updates the object's position if it has moved.
 *
 * @returns Position after updating
 */
function updatePosition(arObject, ref, targetPosition, setTargetPosition) {
    var _a, _b;
    let position = arObject.position.clone();
    const movement = arObject.behaviours.movement;
    if (movement instanceof Behaviour_1.PathMovement) {
        position = movement.getOffsetPosition(position);
    }
    else if (movement instanceof Behaviour_1.OrbitMovement) {
        position = movement.getOffsetPosition(position);
    }
    else if (movement instanceof Behaviour_1.SpringMovement) {
        if (targetPosition !== arObject.position) {
            setTargetPosition(arObject.position);
        }
        return (_b = (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : arObject.position;
    }
    const mesh = ref.current;
    if (mesh) {
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
    }
    return position;
}
/**
 * Component with the model to show.
 */
function ModelComponent(props) {
    let modelClass = props.arObject.behaviours.model;
    if (modelClass instanceof Behaviour_1.GltfModel) {
        return react_2.default.createElement(GltfComponent_1.GltfComponent, Object.assign({ gltfModel: modelClass }, props));
    }
    if (modelClass instanceof Behaviour_1.ShapeModel) {
        return react_2.default.createElement(ShapeComponent_1.ShapeComponent, Object.assign({ shapeModel: modelClass }, props));
    }
    if (modelClass instanceof Behaviour_1.InterfaceModel) {
        return react_2.default.createElement(InterfaceComponent_1.InterfaceComponent, Object.assign({ interfaceModel: modelClass }, props));
    }
    if (modelClass instanceof Behaviour_1.LightModel) {
        return react_2.default.createElement(LightComponent_1.LightComponent, Object.assign({ lightModel: modelClass }, props));
    }
    return react_2.default.createElement(react_2.default.Fragment, null);
}
// Render
/**
 * Checks and updates visibility if render distance set.
 */
function handleVisibility(arObject, position, userPosition, setShowComponent) {
    var _a;
    const behaviour = (_a = arObject.behaviours.render) !== null && _a !== void 0 ? _a : new Behaviour_1.RenderWithinDistance(5);
    if (behaviour instanceof Behaviour_1.RenderWithinDistance) {
        const distanceVector = new three_1.Vector3(0, 0, 0);
        distanceVector.subVectors(position, userPosition);
        const distance = distanceVector.length();
        setShowComponent(distance <= behaviour.distance);
    }
    else if (behaviour instanceof Behaviour_1.AlwaysRender) {
        setShowComponent(true);
    }
}
// Rotation
/**
 * Updates the rotation of the object.
 */
function handleRotation(arObject, position, userPosition, ref, delta) {
    const rotation = arObject.behaviours.rotation;
    const mesh = ref.current;
    if (!mesh)
        return;
    if (rotation instanceof Behaviour_1.RotateToUser) {
        mesh.rotation.y = Math.atan2(userPosition.x - position.x, userPosition.z - position.z);
    }
    else if (rotation instanceof Behaviour_1.RotateAroundY) {
        mesh.rotation.y += delta;
    }
    else if (rotation instanceof Behaviour_1.FixRotation) {
        mesh.rotation.y = rotation.rotation;
    }
    else {
        mesh.rotation.y = 0;
    }
}
