"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GltfComponent = void 0;
const fiber_1 = require("@react-three/fiber");
const react_1 = require("react");
// eslint-disable-next-line
const SkeletonUtils = __importStar(require("three/examples/jsm/utils/SkeletonUtils.js"));
const AnimationMixer_1 = require("three/src/animation/AnimationMixer");
const three_1 = require("@react-spring/three");
const drei_1 = require("@react-three/drei");
const react_2 = __importDefault(require("react"));
/**
 * Component for showing GLTF model.
 */
function GltfComponent(props) {
    const model = (0, drei_1.useGLTF)(props.gltfModel.resource);
    const [scene, setScene] = (0, react_1.useState)();
    const mixer = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        // Need to clone to prevent bug when the same GLTF model is used in multiple objects.
        const clonedScene = SkeletonUtils.clone(model.scene);
        setScene(clonedScene);
        mixer.current = new AnimationMixer_1.AnimationMixer(clonedScene);
    }, [model.scene]);
    (0, react_1.useEffect)(() => {
        if (model.animations.length > 0) {
            // Creates a function that starts an animation in the GLTF model asset.
            props.gltfModel.callAnimation = (actionName) => {
                var _a, _b;
                const selectedAction = model.animations.find((item) => item.name === actionName);
                if (!selectedAction)
                    return;
                (_a = mixer.current) === null || _a === void 0 ? void 0 : _a.stopAllAction();
                const action = (_b = mixer.current) === null || _b === void 0 ? void 0 : _b.clipAction(selectedAction);
                action === null || action === void 0 ? void 0 : action.play();
            };
        }
    }, [props.gltfModel, model.animations, model.animations.length]);
    (0, fiber_1.useFrame)((_, delta) => {
        var _a;
        (_a = mixer.current) === null || _a === void 0 ? void 0 : _a.update(delta);
    });
    // Issue with excessively deep animated mesh https://github.com/pmndrs/react-spring/issues/1515
    return (react_2.default.createElement(three_1.animated.mesh, { position: props.springPosition, scale: props.gltfModel.scale, ref: props.meshRef },
        react_2.default.createElement(react_1.Suspense, { fallback: null }, scene ? react_2.default.createElement("primitive", { object: scene }) : null),
        props.children));
}
exports.GltfComponent = GltfComponent;
