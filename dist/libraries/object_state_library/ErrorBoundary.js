"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * Component to prevent crash when there is an issue with the AR object.
 */
class ErrorBoundary extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
exports.default = ErrorBoundary;
