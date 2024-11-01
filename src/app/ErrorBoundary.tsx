"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Placeholder for logging to a service
    //  this is where we'd use something like Sentry, DataDog, etc.
    //  just console error'ing for now
    console.error("Logged error to service:", { error, info });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 text-gray-700">
          <h1 className="text-3xl font-semibold text-red-600">Oops! Something went wrong.</h1>
          <p className="mt-4 text-lg">We’re sorry, but something unexpected happened. You can try reloading the page.</p>
          <pre className="mt-6 p-4 bg-gray-200 text-red-800 rounded-lg text-sm max-w-lg overflow-auto">
            <strong>Error:</strong> {this.state.errorMessage}
          </pre>
          <button
            onClick={this.handleReload}
            className="mt-8 px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
