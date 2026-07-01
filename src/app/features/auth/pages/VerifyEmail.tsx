import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { api } from '@/lib/api';
import axios from 'axios';
import { translateApiError } from '@/app/shared/utils/errorTranslator';

type VerificationStatus = 'verifying' | 'success' | 'error' | 'expired' | 'invalid';

export const VerifyEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { verifyEmail } = useAuth();
    const [status, setStatus] = useState<VerificationStatus>('verifying');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        const emailParam = searchParams.get('email');

        if (emailParam) {
            setEmail(emailParam);
        }

        const verify = async () => {
            if (!token) {
                setStatus('invalid');
                return;
            }

            try {
                const success = await api.post("/magic_token/validate_user", { token });

                if (!success) {
                    setStatus('error');
                    return;
                }

                setStatus('success');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const backendError =
                        error.response?.data?.error ||
                        error.response?.data?.message;

                    if (backendError === 'Invalid or expired token') {
                        setStatus('expired');
                    } else if (backendError === 'The token field must be a valid UUID.') {
                        setStatus('invalid');
                    } else {
                        setStatus('error');
                    }
                }
            }
        };

        verify();
    }, [searchParams, verifyEmail, navigate]);

    return (

        <div className="w-full max-w-md relative z-10">
            <div className="bg-card rounded-3xl shadow-2xl border border-border p-10">
                {/* Estado: Verificando */}
                {status === 'verifying' && (
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                            </div>
                        </div>
                        <h2 className="text-2xl text-foreground mb-2">Verificando tu cuenta</h2>
                        <p className="text-muted-foreground">
                            Por favor espera mientras validamos tu correo electrónico...
                        </p>
                        <div className="mt-6 flex justify-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                )}

                {/* Estado: Éxito */}
                {status === 'success' && (
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-success" />
                            </div>
                        </div>
                        <h2 className="text-2xl text-foreground mb-2">¡Verificación Exitosa!</h2>
                        <p className="text-muted-foreground mb-6">
                            Tu cuenta ha sido verificada correctamente. Ya puedes acceder a SAMI.
                        </p>

                        {email && (
                            <div className="mb-6 p-4 rounded-xl bg-success/5 border border-success/20">
                                <p className="text-sm text-muted-foreground mb-1">Cuenta verificada:</p>
                                <p className="text-sm text-foreground">{email}</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <Link to="/login" className="block">
                                <button className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    Iniciar Sesión
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <p className="text-xs text-muted-foreground">
                                Serás redirigido automáticamente en unos segundos...
                            </p>
                        </div>
                    </div>
                )}

                {/* Estado: Error */}
                {status === 'error' && (
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-destructive" />
                            </div>
                        </div>
                        <h2 className="text-2xl text-foreground mb-2">Error de Verificación</h2>
                        <p className="text-muted-foreground mb-6">
                            No pudimos verificar tu cuenta. El token puede ser inválido o ya fue utilizado.
                        </p>

                        <div className="mb-6 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                            <p className="text-sm text-destructive mb-2">Posibles causas:</p>
                            <ul className="text-xs text-muted-foreground text-left space-y-1">
                                <li>• El token ya fue utilizado anteriormente</li>
                                <li>• El enlace es incorrecto o está incompleto</li>
                                <li>• Hubo un error en el servidor</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Link to="/resend-verification" className="block">
                                <button className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Solicitar Nuevo Token
                                </button>
                            </Link>
                            <Link to="/login" className="block">
                                <button className="w-full py-3 border-2 border-border text-foreground rounded-xl hover:bg-muted transition-all duration-200">
                                    Volver al Inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Estado: Expirado */}
                {status === 'expired' && (
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-warning" />
                            </div>
                        </div>
                        <h2 className="text-2xl text-foreground mb-2">Token Expirado</h2>
                        <p className="text-muted-foreground mb-6">
                            El token de verificación ha expirado. Los tokens son válidos por 24 horas.
                        </p>

                        <div className="mb-6 p-4 rounded-xl bg-warning/5 border border-warning/20">
                            <p className="text-sm text-warning mb-2">¿Qué puedes hacer?</p>
                            <p className="text-xs text-muted-foreground">
                                Solicita un nuevo token de verificación y úsalo dentro de las próximas 24 horas.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link to="/resend-verification" className="block">
                                <button className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Solicitar Nuevo Token
                                </button>
                            </Link>
                            <Link to="/login" className="block">
                                <button className="w-full py-3 border-2 border-border text-foreground rounded-xl hover:bg-muted transition-all duration-200">
                                    Volver al Inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Estado: Inválido */}
                {status === 'invalid' && (
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                                <XCircle className="w-10 h-10 text-destructive" />
                            </div>
                        </div>
                        <h2 className="text-2xl text-foreground mb-2">Enlace Inválido</h2>
                        <p className="text-muted-foreground mb-6">
                            El enlace de verificación no es válido o está incompleto.
                        </p>

                        <div className="mb-6 p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                            <p className="text-sm text-destructive mb-2">¿Qué ocurrió?</p>
                            <p className="text-xs text-muted-foreground">
                                El enlace debe contener un token de verificación válido. Por favor, copia el enlace completo del email que recibiste.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link to="/resend-verification" className="block">
                                <button className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Solicitar Nuevo Token
                                </button>
                            </Link>
                            <Link to="/login" className="block">
                                <button className="w-full py-3 border-2 border-border text-foreground rounded-xl hover:bg-muted transition-all duration-200">
                                    Volver al Inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Soporte */}
                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        ¿Necesitas ayuda?{' '}
                        <button className="text-primary hover:text-accent transition-colors">
                            Contactar soporte
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
