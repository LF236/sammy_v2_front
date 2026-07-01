import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', general: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: '', password: '', general: '' });

        // Validaciones del lado del cliente
        const newErrors = { email: '', password: '', general: '' };

        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!email.includes('@')) {
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (password.length < 4) {
            newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const success = await login({ email, password });

            if (!success) {
                setErrors({
                    email: '',
                    password: '',
                    general: 'Correo o contraseña incorrectos',
                });
                return;
            }
            navigate('/app/dashboard', {
                replace: true,
            });
        } catch (error) {
            setErrors({
                email: '',
                password: '',
                general:
                    error instanceof Error
                        ? error.message
                        : 'Error desconocido.',
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Columna izquierda - Branding */}
                <div className="hidden lg:block">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                <svg width="50" height="50">
                                    <image
                                        href="/logo.png"
                                        width="50"
                                        height="50"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl text-foreground tracking-tight">SAMI</h1>
                                <p className="text-sm text-muted-foreground">Sistema Administrativo Médico Integral</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-5xl text-foreground mb-6 leading-tight tracking-tight">
                        La plataforma que <span className="text-primary">moderniza</span> tu clínica
                    </h2>

                    <p className="text-lg text-muted-foreground mb-10">
                        Gestiona pacientes, citas, expedientes e inventario desde una sola plataforma intuitiva y segura.
                    </p>
                </div>

                {/* Columna derecha - Formulario */}
                <div>
                    <div className="bg-card rounded-3xl shadow-2xl border border-border p-10">
                        {/* Logo móvil */}
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                <svg width="50" height="50">
                                    <image
                                        href="/logo.png"
                                        width="50"
                                        height="50"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl text-foreground">SAMI</h1>
                                <p className="text-xs text-muted-foreground">Sistema Médico Integral</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl text-foreground mb-2">Bienvenido de nuevo</h3>
                            <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
                        </div>

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

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm text-foreground">
                                        Contraseña
                                    </label>
                                    <button type="button" className="text-xs text-primary hover:text-accent transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`w-full px-4 py-3.5 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.password
                                        ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
                                        : 'border-border focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                                />
                                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                                    Mantener sesión iniciada
                                </label>
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
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                ¿No tienes cuenta?{' '}
                                <Link to="/register" className="text-primary hover:text-accent transition-colors">
                                    Crear cuenta
                                </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                ¿No recibiste el email de verificación?{' '}
                                <Link to="/resend-verification" className="text-primary hover:text-accent transition-colors">
                                    Reenviar token
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
