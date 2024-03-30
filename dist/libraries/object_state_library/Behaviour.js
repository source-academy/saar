"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMovement = exports.SpringMovement = exports.OrbitMovement = exports.PathMovement = exports.MovementStyle = exports.MovementClass = exports.parseRotation = exports.FixRotation = exports.RotateAroundY = exports.RotateToUser = exports.RotationClass = exports.parseRender = exports.AlwaysRender = exports.RenderWithinDistance = exports.RenderClass = exports.LightModel = exports.InterfaceModel = exports.ShapeModel = exports.GltfModel = exports.ModelClass = void 0;
const three_1 = require("three");
const Misc_1 = require("./Misc");
// Model
/**
 * Base class for a model behaviour.
 */
class ModelClass {
}
exports.ModelClass = ModelClass;
/**
 * Behaviour for a glTF model.
 *
 * @param resource Path to glTF file
 * @param scale Scale to render model
 */
class GltfModel {
    constructor(resource, scale) {
        this.resource = resource;
        this.scale = scale;
    }
}
exports.GltfModel = GltfModel;
/**
 * Behaviour for ThreeJS shapes model.
 *
 * @param geometry ThreeJS geometry
 * @param material ThreeJS material
 */
class ShapeModel {
    constructor(geometry, material) {
        this.geometry = geometry;
        this.material = material;
    }
}
exports.ShapeModel = ShapeModel;
class InterfaceModel {
    constructor(rootComponent) {
        this.rootComponent = rootComponent;
    }
}
exports.InterfaceModel = InterfaceModel;
class LightModel {
    constructor(intensity) {
        this.intensity = intensity;
    }
}
exports.LightModel = LightModel;
// Render
const RENDER_DISTANCE = 'RenderWithinDistance';
const RENDER_ALWAYS = 'AlwaysRender';
class RenderClass {
    constructor() {
        this.type = '';
    }
}
exports.RenderClass = RenderClass;
class RenderWithinDistance {
    constructor(distance) {
        this.type = RENDER_DISTANCE;
        this.distance = distance;
    }
}
exports.RenderWithinDistance = RenderWithinDistance;
class AlwaysRender {
    constructor() {
        this.type = RENDER_ALWAYS;
    }
}
exports.AlwaysRender = AlwaysRender;
function parseRender(render) {
    if (!render)
        return undefined;
    switch (render.type) {
        case RENDER_ALWAYS: {
            return new AlwaysRender();
        }
        case RENDER_DISTANCE: {
            let distance = 5;
            if (typeof render.distance === 'number') {
                distance = render.distance;
            }
            return new RenderWithinDistance(distance);
        }
    }
    return undefined;
}
exports.parseRender = parseRender;
// Rotation
const ROTATION_USER = 'RotateToUser';
const ROTATION_Y = 'RotateAroundY';
const ROTATION_FIX = 'FixRotation';
/**
 * Base class for a rotation behaviour.
 */
class RotationClass {
    constructor() {
        this.type = '';
    }
}
exports.RotationClass = RotationClass;
/**
 * Behaviour where object will always rotate to the user.
 */
class RotateToUser {
    constructor() {
        this.type = ROTATION_USER;
    }
}
exports.RotateToUser = RotateToUser;
/**
 * Behaviour where object will keep spinning around the y-axis.
 */
class RotateAroundY {
    constructor() {
        this.type = ROTATION_Y;
    }
}
exports.RotateAroundY = RotateAroundY;
/**
 * Behaviour where object will stay in a fixed rotation.
 */
class FixRotation {
    constructor(radians) {
        this.type = ROTATION_FIX;
        this.rotation = radians;
    }
}
exports.FixRotation = FixRotation;
function parseRotation(rotation) {
    if (!rotation)
        return undefined;
    switch (rotation === null || rotation === void 0 ? void 0 : rotation.type) {
        case ROTATION_USER: {
            return new RotateToUser();
        }
        case ROTATION_Y: {
            return new RotateAroundY();
        }
        case ROTATION_FIX: {
            let angle = 0;
            if (typeof rotation.rotation === 'number') {
                angle = rotation.rotation;
            }
            return new FixRotation(angle);
        }
    }
    return undefined;
}
exports.parseRotation = parseRotation;
// Movement
const MOVEMENT_PATH = 'PathMovement';
const MOVEMENT_ORBIT = 'OrbitMovement';
const MOVEMENT_SPRING = 'SpringMovement';
/**
 * Base class for a movement behaviour.
 *
 * @param startTime Reference time for the start of movement, for syncing
 */
class MovementClass {
    constructor() {
        this.type = '';
    }
}
exports.MovementClass = MovementClass;
var MovementStyle;
(function (MovementStyle) {
    MovementStyle[MovementStyle["Linear"] = 0] = "Linear";
    MovementStyle[MovementStyle["FastToSlow"] = 1] = "FastToSlow";
    MovementStyle[MovementStyle["SlowToFast"] = 2] = "SlowToFast";
})(MovementStyle || (exports.MovementStyle = MovementStyle = {}));
function parsePathItems(path) {
    const result = [];
    for (let i = 0; i < path.length; i++) {
        const item = path[i];
        const start = (0, Misc_1.parseVector3)(item.start);
        const end = (0, Misc_1.parseVector3)(item.end);
        const duration = item.duration;
        if (start instanceof three_1.Vector3 &&
            end instanceof three_1.Vector3 &&
            (duration === undefined || typeof duration === 'number')) {
            let movementStyle = MovementStyle.Linear;
            if (item.style === MovementStyle.FastToSlow) {
                movementStyle = MovementStyle.FastToSlow;
            }
            else if (item.style === MovementStyle.SlowToFast) {
                movementStyle = MovementStyle.SlowToFast;
            }
            result.push({
                start,
                end,
                duration,
                style: movementStyle,
            });
        }
    }
    return result;
}
/**
 * Behaviour where the object moves in the defined path.
 * Cycles through the path array repeatedly.
 *
 * @param path Array of path items defining movement of object
 * @param startTime Reference time for the start of movement, for syncing
 */
class PathMovement extends MovementClass {
    constructor(path, startTime, getCurrentTime) {
        super();
        this.type = MOVEMENT_PATH;
        this.path = path;
        this.totalDuration = 0;
        if (startTime) {
            this.startTime = startTime;
        }
        else {
            const currentDate = new Date();
            this.startTime = currentDate.getTime();
        }
        if (getCurrentTime) {
            this.getCurrentTime = getCurrentTime;
        }
        else {
            this.getCurrentTime = () => {
                const currentDate = new Date();
                return currentDate.getTime();
            };
        }
        path.forEach((item) => {
            this.totalDuration += item.duration;
        });
    }
    getOffsetPosition(position) {
        let currentFrame = (this.getCurrentTime() - this.startTime) % (this.totalDuration * 1000);
        let currentMovementIndex = 0;
        while (currentFrame > 0 && currentMovementIndex < this.path.length) {
            let currentItem = this.path[currentMovementIndex];
            if (currentFrame >= currentItem.duration * 1000) {
                currentFrame -= currentItem.duration * 1000;
                currentMovementIndex++;
                continue;
            }
            let ratio = Math.min(Math.max(0, currentFrame / (currentItem.duration * 1000)), 1);
            switch (currentItem.style) {
                case MovementStyle.SlowToFast: {
                    ratio **= 5;
                    break;
                }
                case MovementStyle.FastToSlow: {
                    let negative = 1 - ratio;
                    negative **= 5;
                    ratio = 1 - negative;
                    break;
                }
            }
            const x = position.x +
                currentItem.start.x +
                ratio * (currentItem.end.x - currentItem.start.x);
            const y = position.y +
                currentItem.start.y +
                ratio * (currentItem.end.y - currentItem.start.y);
            const z = position.z +
                currentItem.start.z +
                ratio * (currentItem.end.z - currentItem.start.z);
            return new three_1.Vector3(x, y, z);
        }
        return position;
    }
}
exports.PathMovement = PathMovement;
/**
 * Behaviour where the object orbits around its position at a specified radius.
 *
 * @param radius Radius of orbit
 * @param duration Duration of a single orbit
 * @param startTime Reference time for the start of movement, for syncing
 */
class OrbitMovement extends MovementClass {
    constructor(radius, duration, startTime, getCurrentTime) {
        super();
        this.type = MOVEMENT_ORBIT;
        this.radius = radius;
        this.duration = duration;
        if (startTime) {
            this.startTime = startTime;
        }
        else {
            let currentDate = new Date();
            this.startTime = currentDate.getTime();
        }
        if (getCurrentTime) {
            this.getCurrentTime = getCurrentTime;
        }
        else {
            this.getCurrentTime = () => {
                let currentDate = new Date();
                return currentDate.getTime();
            };
        }
    }
    getOffsetPosition(position) {
        const currentFrame = (this.getCurrentTime() - this.startTime) % (this.duration * 1000);
        const ratio = Math.min(Math.max(0, currentFrame / (this.duration * 1000)), 1);
        const angle = ratio * Math.PI * 2;
        const x = position.x + this.radius * Math.sin(angle);
        const y = position.y;
        const z = position.z + this.radius * Math.cos(angle);
        return new three_1.Vector3(x, y, z);
    }
}
exports.OrbitMovement = OrbitMovement;
class SpringMovement extends MovementClass {
    constructor() {
        super(...arguments);
        this.type = MOVEMENT_SPRING;
    }
}
exports.SpringMovement = SpringMovement;
function parseMovement(movement, getCurrentTime) {
    if (!movement)
        return undefined;
    switch (movement.type) {
        case MOVEMENT_PATH: {
            const startTime = movement.startTime;
            const pathItems = movement.path;
            if ((startTime === undefined || typeof startTime === 'number') &&
                Array.isArray(pathItems)) {
                const parsedPathItems = parsePathItems(pathItems);
                return new PathMovement(parsedPathItems, startTime, getCurrentTime);
            }
            break;
        }
        case MOVEMENT_ORBIT: {
            const radius = movement.radius;
            const duration = movement.duration;
            const startTime = movement.startTime;
            if (typeof radius === 'number' &&
                typeof duration === 'number' &&
                (startTime === undefined || typeof startTime === 'number')) {
                return new OrbitMovement(radius, duration, startTime, getCurrentTime);
            }
            break;
        }
        case MOVEMENT_SPRING:
            return new SpringMovement();
    }
    return undefined;
}
exports.parseMovement = parseMovement;
