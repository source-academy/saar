"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScreenState = exports.ScreenStateContext = void 0;
const react_1 = require("react");
const xr_1 = require("@react-three/xr");
const fiber_1 = require("@react-three/fiber");
const react_2 = __importDefault(require("react"));
const Context = (0, react_1.createContext)({
    overlayRef: null,
    domOverlay: undefined,
    setState() { },
    component: react_2.default.createElement(react_2.default.Fragment, null),
});
/**
 * Parent component with screen state context.
 * Used for managing ar content and its corresponding overlay.
 *
 * Steps to use:
 * 1. Add 'domOverlay' to sessionInit of AR toggle.
 * 2. Add 'component' as a child of this ScreenStateContext.
 * 3. Call 'setStates' to set all possible screen states.
 * 4. The first screen state in the map is used by default.
 * 5. To switch screen states, call 'setSelectedState' with the new state's key.
 * 6. Use 'overlayRef' to interact with the existing overlay.
 *
 * Components within it can call 'useScreenState' to obtain this context.
 */
function ScreenStateContext(props) {
    const [arState, setArState] = (0, react_1.useState)(react_2.default.createElement("group", null));
    const [overlayState, setOverlayState] = (0, react_1.useState)(react_2.default.createElement(react_2.default.Fragment, null));
    const isXRSession = (0, react_1.useRef)(false);
    const overlayRef = (0, react_1.useRef)(null);
    const [domOverlay, setDomOverlay] = (0, react_1.useState)();
    const defaultComponent = (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(fiber_1.Canvas, null,
            react_2.default.createElement(xr_1.XR, null,
                react_2.default.createElement(react_2.default.Fragment, null))),
        react_2.default.createElement("div", { ref: overlayRef, style: { userSelect: 'none' } })));
    const [component, setComponent] = (0, react_1.useState)(defaultComponent);
    (0, react_1.useEffect)(() => {
        if (!overlayRef)
            return;
        const overlay = overlayRef.current;
        if (overlay) {
            setDomOverlay(overlay);
        }
        else {
            setDomOverlay(undefined);
        }
    }, [overlayRef, component]);
    (0, react_1.useEffect)(() => {
        updateComponent();
    }, [arState, overlayState]);
    function updateComponent() {
        setComponent(react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(fiber_1.Canvas, null,
                react_2.default.createElement(xr_1.XR, { onSessionStart: () => {
                        isXRSession.current = true;
                        updateComponent();
                    }, onSessionEnd: () => {
                        isXRSession.current = false;
                        updateComponent();
                    } }, isXRSession.current ? arState : react_2.default.createElement(react_2.default.Fragment, null))),
            react_2.default.createElement("div", { ref: overlayRef, style: {
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none',
                } }, isXRSession.current ? overlayState : react_2.default.createElement(react_2.default.Fragment, null))));
    }
    function setStates(newArState, newOverlayState) {
        if (newArState) {
            setArState(newArState);
        }
        else {
            setArState(react_2.default.createElement("group", null));
        }
        if (newOverlayState) {
            setOverlayState(newOverlayState);
        }
        else {
            setOverlayState(react_2.default.createElement(react_2.default.Fragment, null));
        }
    }
    return (react_2.default.createElement(Context.Provider, { value: {
            overlayRef,
            domOverlay: domOverlay ? { root: domOverlay } : undefined,
            setState: setStates,
            component,
        } }, props.children));
}
exports.ScreenStateContext = ScreenStateContext;
function useScreenState() {
    return (0, react_1.useContext)(Context);
}
exports.useScreenState = useScreenState;
