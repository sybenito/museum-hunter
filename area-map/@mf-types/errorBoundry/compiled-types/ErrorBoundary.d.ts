import React, { Component, ErrorInfo, ReactNode } from "react";
interface Props {
    children: ReactNode;
    fallback: ReactNode;
}
interface State {
    hasError: boolean;
    error: Error | null;
}
declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): React.ReactNode;
}
export default ErrorBoundary;
