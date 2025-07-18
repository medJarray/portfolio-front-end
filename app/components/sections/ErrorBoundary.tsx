import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Home } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorId: Math.random().toString(36).substr(2, 9),
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: Math.random().toString(36).substr(2, 9),
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    // Monitoring prod (Sentry, etc.)
    if (process.env.NODE_ENV === 'production') {
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: Math.random().toString(36).substr(2, 9),
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <ErrorMessage
            message={
              "Oops! Une erreur est survenue. Une erreur inattendue s'est produite. Nous nous excusons pour la gêne occasionnée."
            }
            actions={
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  <RefreshCw className="h-4 w-4" /> Réessayer
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                  >
                    <Home className="h-4 w-4" /> Accueil
                  </button>
                  <button
                    onClick={this.handleReload}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                  >
                    <RefreshCw className="h-4 w-4" /> Recharger
                  </button>
                </div>
              </div>
            }
            errorId={this.state.errorId}
            details={
              process.env.NODE_ENV === 'development' && this.state.error
                ? `${this.state.error.toString()}\n\nStack trace:\n${this.state.error.stack ?? ''}`
                : undefined
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}
