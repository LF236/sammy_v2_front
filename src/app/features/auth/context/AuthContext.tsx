import React, { ReactNode } from 'react';
import { useAuthStore } from '../stores/authStore';

// Re-exportar el hook del store como useAuth para compatibilidad con el resto de la app
export { useAuthStore as useAuth } from '../stores/authStore';

// AuthProvider es ahora un passthrough — el estado vive en el store de Zustand
export function AuthProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
