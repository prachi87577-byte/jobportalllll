import React from 'react'

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
            Something went wrong
          </h2>
          <p className="text-slate-500 max-w-md">{this.state.error?.message}</p>
          <button
            className="btn-primary"
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
          >
            Go Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
