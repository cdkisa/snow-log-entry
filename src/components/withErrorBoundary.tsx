import * as React from "react";
import ErrorBoundary, { TOnError } from "./ErrorBoundary";

export const withErrorBoundary = (
  Component: React.ComponentType<any>,
  onError?: TOnError
): Function => {
  const Wrapped = (props: any) => (
    <ErrorBoundary onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  // Format for display in DevTools
  const name = Component.displayName || Component.name;
  Wrapped.displayName = name
    ? `WithErrorBoundary(${name})`
    : "WithErrorBoundary";

  return Wrapped;
};
