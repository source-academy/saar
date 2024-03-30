import { Component, type ReactNode } from 'react';
interface Props {
    fallback: ReactNode;
    children?: ReactNode;
}
interface State {
    hasError: boolean;
}
/**
 * Component to prevent crash when there is an issue with the AR object.
 */
export default class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(_: Error): State;
    render(): ReactNode;
}
export {};
