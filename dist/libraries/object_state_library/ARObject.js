"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightObject = exports.UIObject = exports.GltfObject = exports.SphereObject = exports.CubeObject = exports.ARObject = void 0;
const MeshStandardMaterial_1 = require("three/src/materials/MeshStandardMaterial");
const three_1 = require("three");
const Vector3_1 = require("three/src/math/Vector3");
const Behaviour_1 = require("./Behaviour");
const ARObjectComponent_1 = require("./ARObjectComponent");
const Misc_1 = require("./Misc");
const InterfaceComponent_1 = require("./model_components/InterfaceComponent");
const react_1 = __importDefault(require("react"));
/**
 * Abstract class for an AR object.
 * Extend this class to create your custom AR object.
 */
class ARObject {
    constructor(id, position, behaviours, onSelect) {
        this.type = ''; // Unique identifier for class
        this.uuid = undefined; // Identifier for mesh
        this.isInFront = false;
        this.isSelected = false;
        this.toJSON = () => {
            const object = Object.assign({}, this);
            const behavioursClone = Object.assign({}, this.behaviours);
            delete behavioursClone.model;
            object.behaviours = behavioursClone;
            object.isInFront = false;
            return object;
        };
        this.id = id;
        this.position = position;
        this.behaviours = behaviours;
        this.onSelect = onSelect;
    }
    getComponent(getUserPosition) {
        return (react_1.default.createElement(ARObjectComponent_1.ARObjectComponent, { key: this.id, arObject: this, getUserPosition: getUserPosition, setUUID: (uuid) => {
                this.uuid = uuid;
            }, onSelect: this.onSelect }));
    }
}
exports.ARObject = ARObject;
ARObject.fromObject = (object, getCurrentTime) => {
    if (!object)
        return;
    let isSelected = false;
    const tempSelected = object.isSelected;
    if (typeof tempSelected === 'boolean') {
        isSelected = tempSelected;
    }
    const newObject = CubeObject.parseObject(object, getCurrentTime) ||
        SphereObject.parseObject(object, getCurrentTime) ||
        GltfObject.parseObject(object, getCurrentTime) ||
        UIObject.parseObject(object, getCurrentTime) ||
        LightObject.parseObject(object);
    if (newObject) {
        newObject.isSelected = isSelected;
        return newObject;
    }
    return undefined;
};
/**
 * Predefined class for a cube AR object.
 */
const CUBE_OBJECT_TYPE = 'CubeObject';
class CubeObject extends ARObject {
    constructor(id, position, width, height, depth, color, render, rotation, movement, onSelect) {
        super(id, position, {
            model: new Behaviour_1.ShapeModel(new three_1.BoxGeometry(width, height, depth), new MeshStandardMaterial_1.MeshStandardMaterial({ color })),
            render,
            rotation,
            movement,
        }, onSelect);
        this.type = CUBE_OBJECT_TYPE;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.color = color;
    }
    static parseObject(object, onSelect, getCurrentTime) {
        var _a, _b, _c;
        if (!object || object.type !== CUBE_OBJECT_TYPE)
            return undefined;
        const id = object.id;
        const position = (0, Misc_1.parseVector3)(object.position);
        const render = (0, Behaviour_1.parseRender)((_a = object.behaviours) === null || _a === void 0 ? void 0 : _a.render);
        const rotation = (0, Behaviour_1.parseRotation)((_b = object.behaviours) === null || _b === void 0 ? void 0 : _b.rotation);
        const movement = (0, Behaviour_1.parseMovement)((_c = object.behaviours) === null || _c === void 0 ? void 0 : _c.movement, getCurrentTime);
        const width = object.width;
        const height = object.height;
        const depth = object.depth;
        const color = object.color;
        if (typeof id === 'string' &&
            position instanceof Vector3_1.Vector3 &&
            typeof width === 'number' &&
            typeof height === 'number' &&
            typeof depth === 'number' &&
            typeof color === 'number') {
            return new CubeObject(id, position, width, height, depth, color, render, rotation, movement, onSelect);
        }
        return undefined;
    }
}
exports.CubeObject = CubeObject;
/**
 * Predefined class for a sphere AR object.
 */
const SPHERE_OBJECT_TYPE = 'SphereObject';
class SphereObject extends ARObject {
    constructor(id, position, radius, color, render, rotation, movement, onSelect) {
        super(id, position, {
            model: new Behaviour_1.ShapeModel(new three_1.SphereGeometry(radius, 20, 20), new MeshStandardMaterial_1.MeshStandardMaterial({ color })),
            render,
            rotation,
            movement,
        }, onSelect);
        this.type = SPHERE_OBJECT_TYPE;
        this.radius = radius;
        this.color = color;
    }
    static parseObject(object, onSelect, getCurrentTime) {
        var _a, _b, _c;
        if (!object || object.type !== SPHERE_OBJECT_TYPE)
            return undefined;
        const id = object.id;
        const position = (0, Misc_1.parseVector3)(object.position);
        const render = (0, Behaviour_1.parseRender)((_a = object.behaviours) === null || _a === void 0 ? void 0 : _a.render);
        const rotation = (0, Behaviour_1.parseRotation)((_b = object.behaviours) === null || _b === void 0 ? void 0 : _b.rotation);
        const movement = (0, Behaviour_1.parseMovement)((_c = object.behaviours) === null || _c === void 0 ? void 0 : _c.movement, getCurrentTime);
        const radius = object.radius;
        const color = object.color;
        if (typeof id === 'string' &&
            position instanceof Vector3_1.Vector3 &&
            typeof radius === 'number' &&
            typeof color === 'number') {
            return new SphereObject(id, position, radius, color, render, rotation, movement, onSelect);
        }
        return undefined;
    }
}
exports.SphereObject = SphereObject;
/**
 * Predefined class for a GLTF model AR object.
 */
const GLTF_OBJECT_TYPE = 'GltfObject';
class GltfObject extends ARObject {
    constructor(id, position, src, scale, render, rotation, movement, onSelect) {
        super(id, position, {
            model: new Behaviour_1.GltfModel(src, scale),
            render,
            rotation,
            movement,
        }, onSelect);
        this.type = GLTF_OBJECT_TYPE;
        this.src = src;
        this.scale = scale;
    }
    static parseObject(object, onSelect, getCurrentTime) {
        var _a, _b, _c;
        if (!object || object.type !== GLTF_OBJECT_TYPE)
            return undefined;
        const id = object.id;
        const position = (0, Misc_1.parseVector3)(object.position);
        const render = (0, Behaviour_1.parseRender)((_a = object.behaviours) === null || _a === void 0 ? void 0 : _a.render);
        const rotation = (0, Behaviour_1.parseRotation)((_b = object.behaviours) === null || _b === void 0 ? void 0 : _b.rotation);
        const movement = (0, Behaviour_1.parseMovement)((_c = object.behaviours) === null || _c === void 0 ? void 0 : _c.movement, getCurrentTime);
        const src = object.src;
        const scale = object.scale;
        if (typeof id === 'string' &&
            position instanceof Vector3_1.Vector3 &&
            typeof src === 'string' &&
            typeof scale === 'number') {
            return new GltfObject(id, position, src, scale, render, rotation, movement, onSelect);
        }
        return undefined;
    }
}
exports.GltfObject = GltfObject;
/**
 * Predefined class for a floating interface AR object.
 */
const UI_OBJECT_TYPE = 'UIObject';
class UIObject extends ARObject {
    constructor(id, position, uiJson, render, rotation, movement, onSelect) {
        super(id, position, {
            model: new Behaviour_1.InterfaceModel(uiJson),
            render,
            rotation,
            movement,
        }, onSelect);
        this.type = UI_OBJECT_TYPE;
        this.uiJson = uiJson;
    }
    static parseObject(object, onSelect, getCurrentTime) {
        var _a, _b, _c;
        if (!object || object.type !== UI_OBJECT_TYPE)
            return undefined;
        const id = object.id;
        const position = (0, Misc_1.parseVector3)(object.position);
        const render = (0, Behaviour_1.parseRender)((_a = object.behaviours) === null || _a === void 0 ? void 0 : _a.render);
        const rotation = (0, Behaviour_1.parseRotation)((_b = object.behaviours) === null || _b === void 0 ? void 0 : _b.rotation);
        const movement = (0, Behaviour_1.parseMovement)((_c = object.behaviours) === null || _c === void 0 ? void 0 : _c.movement, getCurrentTime);
        const uiJson = (0, InterfaceComponent_1.parseJsonInterface)(object.uiJson);
        if (typeof id === 'string' &&
            position instanceof Vector3_1.Vector3 &&
            uiJson !== undefined) {
            return new UIObject(id, position, uiJson, render, rotation, movement, onSelect);
        }
        return undefined;
    }
}
exports.UIObject = UIObject;
/**
 * Predefined class for a light source.
 */
const LIGHT_OBJECT_TYPE = 'LightObject';
class LightObject extends ARObject {
    constructor(id, position, intensity) {
        super(id, position, {
            model: new Behaviour_1.LightModel(intensity),
            render: new Behaviour_1.RenderWithinDistance(20),
        });
        this.type = LIGHT_OBJECT_TYPE;
        this.intensity = intensity;
    }
    static parseObject(object) {
        if (!object || object.type !== LIGHT_OBJECT_TYPE)
            return undefined;
        const id = object.id;
        const position = (0, Misc_1.parseVector3)(object.position);
        const intensity = object.intensity;
        if (typeof id === 'string' &&
            position instanceof Vector3_1.Vector3 &&
            typeof intensity === 'number') {
            return new LightObject(id, position, intensity);
        }
        return undefined;
    }
}
exports.LightObject = LightObject;
