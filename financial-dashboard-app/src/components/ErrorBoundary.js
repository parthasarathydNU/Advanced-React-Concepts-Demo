/**
 *Why do React error boundaries have to be class components ? 
1. Lifecycle Methods:
   Error boundaries rely on specific lifecycle methods that are only available in class components:

   - componentDidCatch(error, errorInfo): This method is called after an error has been thrown by a descendant component. It receives two parameters: the error that was thrown and a stack trace.

   - static getDerivedStateFromError(error): This method is used to render a fallback UI after an error has been thrown.

   These methods are not available in functional components, even with hooks.

2. Historical Context:
   Error boundaries were introduced in React 16, before hooks were available. At that time, class components were the primary way to handle stateful logic and lifecycle methods.

3. Predictable Behavior:
   Class components provide a more predictable and controlled environment for handling errors. They have a well-defined lifecycle and state management system that's particularly suited for error handling scenarios.

4. Separation of Concerns:
   Having error boundaries as class components creates a clear separation between error handling logic and the rest of your application's components, which can be functional.

5. Performance Considerations:
   Error boundaries are designed to catch errors in the entire sub-tree below them. Class components can provide a more optimized way of managing this responsibility without re-rendering unnecessarily.

6. Current React Implementation:
   The current React reconciler is built with the assumption that error boundaries are class components. Changing this would require significant changes to React's core.

However, it's worth noting:

- While error boundaries must be class components, the components they wrap (including the ones that might throw errors) can be functional components using hooks.
- There have been discussions in the React community about potentially allowing functional components to serve as error boundaries in the future, but as of now (React 18), this is not possible.
 */
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // possibly get it via props or from context
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


/**
 * Why is getDerivedStateFromError a static method ? 
 * 

Let's summarize the key points, acknowledging that the static nature might indeed be primarily a design choice for performance and consistency reasons:

Key points:
Static nature doesn't affect instance independence: Each ErrorBoundary instance still manages its own state.

Performance optimization: Static methods can be slightly more efficient as they don't require instance creation to be called.

Enforces purity: Being static ensures the method doesn't rely on or modify instance properties.

Timing: Allows React to call this method before the component instance is fully constructed or updated.

Consistency: Follows the pattern of other static lifecycle methods like getDerivedStateFromProps.

Instance-specific behavior: Despite being static, it's called on the class of the specific ErrorBoundary instance that caught the error.

State updates are instance-specific: The returned state update is applied only to the instance that caught the error.

Design choice by React team: Primarily for ensuring the method is pure, predictable, and can be called at the right time in the lifecycle.

The static nature doesn't fundamentally change how ErrorBoundaries work across multiple instances.

It does seem to be primarily a choice for performance reasons and to enforce certain coding patterns.

The main effect is on how the method is defined and called, not on its behavior across different ErrorBoundary instances.
 */
