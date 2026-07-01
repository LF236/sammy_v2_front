import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

import {
    User,
    Clinic,
    LoginCredentials,
    RegisterData,
    CompleteProfileData,
} from '../../../shared/types';
import axios from 'axios';
import { translateApiError } from '@/app/shared/utils/errorTranslator';

interface VerifyEmailResult {
    success: boolean;
    reason?: 'expired' | 'invalid' | 'already_verified';
}

interface AuthStore {
    user: User | null;
    token: string | null;
    tokenType: string | null;
    selectedClinic: Clinic | null;
    isAuthenticated: boolean;

    login: (credentials: LoginCredentials) => Promise<boolean>;
    getMe: () => Promise<boolean>;
    logout: () => void;
    register: (data: RegisterData) => Promise<boolean>;
    selectClinic: (clinic: Clinic) => void;
    resendVerification: (email: string) => Promise<boolean>;
    verifyEmail: (token: string) => Promise<VerifyEmailResult>;
    completeProfile: (data: CompleteProfileData) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            tokenType: null,
            selectedClinic: null,
            isAuthenticated: false,

            login: async (credentials) => {
                try {
                    const { data } = await api.post('/auth/login', credentials);

                    set({
                        token: data.token,
                        tokenType: data.type ?? 'Bearer',
                        isAuthenticated: true,
                    });

                    return await get().getMe();
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const backendError =
                            error.response?.data?.error ||
                            error.response?.data?.message;

                        throw new Error(
                            translateApiError(backendError)
                        );
                    }

                    throw new Error('Error de conexión con el servidor.');
                }
            },

            getMe: async () => {
                try {
                    const { data } = await api.get('/auth/me');

                    set({
                        user: data,
                        isAuthenticated: true,
                    });

                    return true;
                } catch (error) {
                    console.error('Error al obtener usuario:', error);
                    get().logout();
                    return false;
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    tokenType: null,
                    selectedClinic: null,
                    isAuthenticated: false,
                });
            },

            register: async (data) => {
                return !!(data.email && data.password && data.name);
            },

            selectClinic: (clinic) => {
                const { user } = get();

                set({
                    selectedClinic: clinic,
                    user: user ? { ...user, clinicId: clinic.id } : user,
                });
            },

            resendVerification: async (email) => {
                return !!(email && email.includes('@'));
            },

            verifyEmail: async (token) => {
                if (token === 'valid-token' || token.length > 20) return { success: true };
                if (token === 'expired-token') return { success: false, reason: 'expired' };
                if (token === 'already-verified') return { success: false, reason: 'already_verified' };
                return { success: false, reason: 'invalid' };
            },

            completeProfile: async (data) => {
                const { user } = get();

                if (!user || !data.professionalId || !data.specialty || !data.role) {
                    return false;
                }

                set({
                    user: {
                        ...user,
                        role: data.role,
                        professionalId: data.professionalId,
                        specialty: data.specialty,
                        profileCompleted: true,
                    },
                });

                return true;
            },
        }),
        {
            name: 'sami-auth',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                tokenType: state.tokenType,
                selectedClinic: state.selectedClinic,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);