import React, { useState } from 'react';
import { Link } from 'react-router';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import axios from 'axios';
import { translateApiError } from '@/app/shared/utils/errorTranslator';

export const ResendVerification = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ email: '', general: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: '', general: '' });
        setSuccess(false);

        // Validaciones
        const newErrors = { email: '', general: '' };

        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!email.includes('@')) {
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        if (newErrors.email) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const success = await api.post('/magic_token/generate_new_token', { email })

            if (!success) {
                setErrors({ ...newErrors, general: 'No pudimos enviar el correo. Verifica que el email sea correcto.' });
                return
            }

            setSuccess(true);
            setEmail('');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const backendError =
                    error.response?.data?.error ||
                    error.response?.data?.message;

                setErrors({ ...newErrors, general: translateApiError(backendError) });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md relative z-10">
            <div className="bg-card rounded-3xl shadow-2xl border border-border p-10">
                {/* Botón volver */}
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio de sesión
                </Link>

                {/* Icono central */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-10 h-10 text-primary" />
                    </div>
                </div>

                {/* Título */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl text-foreground mb-2">Reenviar Verificación</h2>
                    <p className="text-muted-foreground">
                        Ingresa tu correo electrónico y te enviaremos un nuevo token de verificación
                    </p>
                </div>

                {/* Mensaje de éxito */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-success/10 border border-success/20">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-success mb-1">¡Correo enviado exitosamente!</p>
                                <p className="text-xs text-muted-foreground mb-3">
                                    Revisa tu bandeja de entrada y la carpeta de spam. El token es válido por 24 horas.
                                </p>
                                <p className="text-xs text-muted-foreground mb-2">Próximos pasos:</p>
                                <ol className="text-xs text-foreground space-y-1 list-decimal list-inside">
                                    <li>Abre el correo que te enviamos</li>
                                    <li>Haz clic en el enlace de verificación</li>
                                    <li>Tu cuenta será verificada automáticamente</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-foreground mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            className={`w-full px-4 py-3.5 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.email
                                ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
                                : 'border-border focus:ring-primary/20 focus:border-primary'
                                }`}
                            placeholder="tu@email.com"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                        )}
                    </div>

                    {errors.general && (
                        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive">{errors.general}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Enviando...' : 'Enviar Token de Verificación'}
                    </button>
                </form>

                {/* Info adicional */}
                <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-2">📧 Información importante:</p>
                    <ul className="text-xs text-foreground space-y-1 list-disc list-inside">
                        <li>El token de verificación expira en 24 horas</li>
                        <li>Revisa tu carpeta de spam si no lo recibes</li>
                        <li>Solo puedes solicitar un nuevo token cada 5 minutos</li>
                    </ul>
                </div>

                {/* Enlaces adicionales */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                        ¿Necesitas ayuda?{' '}
                        <button className="text-primary hover:text-accent transition-colors">
                            Contactar soporte
                        </button>
                    </p>
                </div>
            </div>

            {/* Acceso rápido */}
            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    ¿Ya verificaste tu cuenta?{' '}
                    <Link to="/login" className="text-primary hover:text-accent transition-colors">
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
