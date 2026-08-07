import { Component } from "react";
import { Button } from "@/components/ui/button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("Unhandled error:", error, info);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 space-y-4 text-center">
            <h1 className="text-2xl font-bold text-white">
              Something went wrong
            </h1>
            <p className="text-gray-400 text-sm">
              The game hit an unexpected error. Sorry about that — try going
              back to the dashboard and starting again.
            </p>
            <Button
              onClick={this.handleReload}
              className="w-full h-11 rounded-xl font-semibold text-white bg-cyan-500 hover:bg-cyan-400 cursor-pointer"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
