import React, { Component, ErrorInfo, ReactNode } from 'react';

// --- Error Boundary ---
export class StarMapErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Star Map Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-red-500">Error Loading Star Map</h2>
            <p className="text-white/60">There was a problem loading the 3D assets.</p>
            <button
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
