import React from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, Bug } from 'lucide-react';

// Composant fonctionnel réutilisable pour afficher un message d'erreur API, réseau ou global
export const ErrorMessage: React.FC<{
  message: string;
  actions?: ReactNode;
  errorId?: string;
  details?: string;
}> = ({ message, actions, errorId, details }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="flex items-center gap-2 text-red-600 mb-2">
      <AlertTriangle className="h-5 w-5" />
      <span className="font-semibold">Erreur</span>
    </div>
    <div className="text-gray-700 text-center text-sm max-w-md bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2">
      {message}
    </div>
    {actions}
    {errorId && (
      <div className="mt-4 text-xs text-gray-500">ID d'erreur: <code className="bg-gray-100 px-1 rounded">{errorId}</code></div>
    )}
    {details && (
      <details className="mt-2 text-left w-full max-w-md">
        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-2">
          <Bug className="h-4 w-4" /> Détails de l'erreur (dev)
        </summary>
        <div className="bg-gray-50 rounded-lg p-3 border">
          <pre className="text-xs text-gray-600 overflow-auto max-h-32 whitespace-pre-wrap">{details}</pre>
        </div>
      </details>
    )}
  </div>
);