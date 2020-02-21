import * as React from "react";
import { Component, ErrorInfo } from "react";

export type TOnError = (error: Error, errorInfo: ErrorInfo) => void;

type TProps = {
  children?: any | null;
  onError?: TOnError;
};

type TErrorState = {
  error?: Error | null;
  errorInfo?: ErrorInfo | null;
};

export default class ErrorBoundary extends Component<TProps, TErrorState> {
  state: TErrorState = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, errorInfo);
      } catch (ignoredError) {}
    }
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return children;
  }
}
