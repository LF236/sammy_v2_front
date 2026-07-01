import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Mail, Lock, User, Activity, CheckCircle } from 'lucide-react';

type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

const getPasswordStrength = (password: string): PasswordStrength => {
    if (!password) return null;

    let strength = 0;

    // Longitud
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Mayúsculas
    if (/[A-Z]/.test(password)) strength++;

    // Minúsculas
    if (/[a-z]/.test(password)) strength++;

    // Números
    if (/[0-9]/.test(password)) strength++;

    // Caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
};

export const Register = () => {
    const navigate = useNavigate();
    // const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: ''
    });
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ name: '', email: '', password: '', confirmPassword: '', general: '' });

        // Validaciones del lado del cliente
        const newErrors = { name: '', email: '', password: '', confirmPassword: '', general: '' };

        if (!formData.name) {
            newErrors.name = 'El nombre completo es requerido';
        }

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (newErrors.name || newErrors.email || newErrors.password || newErrors.confirmPassword) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // const success = await register({
            //     name: formData.name,
            //     email: formData.email,
            //     password: formData.password
            // });

            // if (success) {
            //     setRegistrationSuccess(true);
            //     // Después de 5 segundos, redirigir al login
            //     setTimeout(() => {
            //         navigate('/login');
            //     }, 5000);
            // } else {
            //     setErrors({ ...newErrors, general: 'Error al crear la cuenta. Por favor intenta más tarde.' });
            // }
        } catch {
            setErrors({ ...newErrors, general: 'Error al conectar con el servidor. Por favor intenta más tarde.' });
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
                        Únete a la <span className="text-primary">transformación</span> digital
                    </h2>

                    <p className="text-lg text-muted-foreground mb-10">
                        Más de 500 clínicas ya confían en SAMI para gestionar sus operaciones de forma eficiente y segura.
                    </p>

                    {/* Beneficios */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-foreground">Configuración rápida</p>
                                <p className="text-sm text-muted-foreground">Comienza en menos de 5 minutos</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-foreground">Capacitación incluida</p>
                                <p className="text-sm text-muted-foreground">Entrenamiento para todo tu equipo</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-foreground">Soporte 24/7</p>
                                <p className="text-sm text-muted-foreground">Asistencia cuando la necesites</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha - Formulario */}
                <div>
                    <div className="bg-card rounded-3xl shadow-2xl border border-border p-10 max-h-[90vh] overflow-y-auto">
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
                            <h3 className="text-2xl text-foreground mb-2">Crear tu cuenta</h3>
                            <p className="text-muted-foreground">Completa el formulario para comenzar</p>
                        </div>

                        {/* Mensaje de éxito */}
                        {registrationSuccess && (
                            <div className="mb-6 p-5 rounded-xl bg-success/10 border border-success/20">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-success mb-2">¡Cuenta creada exitosamente!</p>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Hemos enviado un correo de verificación a <span className="font-medium text-foreground">{formData.email}</span>
                                        </p>
                                        <div className="p-3 rounded-lg bg-muted border border-success/10">
                                            <p className="text-xs text-muted-foreground mb-2">Próximos pasos:</p>
                                            <ol className="text-xs text-foreground space-y-1 list-decimal list-inside">
                                                <li>Revisa tu correo (incluyendo spam)</li>
                                                <li>Haz clic en el enlace de verificación</li>
                                                <li>Inicia sesión en SAMI</li>
                                                <li>Completa tu perfil profesional</li>
                                            </ol>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-3">
                                            Serás redirigido al inicio de sesión en unos segundos...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm text-foreground mb-2">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (errors.name) setErrors({ ...errors, name: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.name
                                        ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
                                        : 'border-border focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Juan Pérez"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-foreground mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.email
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
                                <label className="block text-sm text-foreground mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => {
                                        const newPassword = e.target.value;
                                        setFormData({ ...formData, password: newPassword });
                                        setPasswordStrength(getPasswordStrength(newPassword));
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.password
                                        ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
                                        : 'border-border focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-destructive">{errors.password}</p>
                                )}

                                {/* Semáforo de fortaleza */}
                                <div className="mt-3">
                                    <div className="flex gap-1.5 mb-1.5">
                                        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${passwordStrength ? 'bg-destructive' : 'bg-muted'
                                            }`} />
                                        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-warning' : 'bg-muted'
                                            }`} />
                                        <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${passwordStrength === 'strong' ? 'bg-success' : 'bg-muted'
                                            }`} />
                                    </div>
                                    {passwordStrength && (
                                        <p className={`text-xs mb-2 ${passwordStrength === 'weak' ? 'text-destructive' :
                                            passwordStrength === 'medium' ? 'text-warning' : 'text-success'
                                            }`}>
                                            {passwordStrength === 'weak' && 'Contraseña débil'}
                                            {passwordStrength === 'medium' && 'Contraseña media'}
                                            {passwordStrength === 'strong' && 'Contraseña segura'}
                                        </p>
                                    )}
                                </div>

                                {/* Requisitos de contraseña — siempre visibles */}
                                <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border">
                                    <p className="text-xs text-muted-foreground mb-2">Requisitos de contraseña:</p>
                                    <ul className="space-y-1">
                                        {[
                                            { label: 'Al menos 8 caracteres', met: formData.password.length >= 8 },
                                            { label: 'Una letra mayúscula', met: /[A-Z]/.test(formData.password) },
                                            { label: 'Una letra minúscula', met: /[a-z]/.test(formData.password) },
                                            { label: 'Un número', met: /[0-9]/.test(formData.password) },
                                            { label: 'Un carácter especial (!@#$%^&*)', met: /[^A-Za-z0-9]/.test(formData.password) },
                                        ].map(({ label, met }) => (
                                            <li key={label} className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? 'text-success' : 'text-muted-foreground'
                                                }`}>
                                                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] transition-colors duration-200 ${met ? 'bg-success/15 text-success' : 'bg-muted-foreground/15'
                                                    }`}>
                                                    {met ? '✓' : '○'}
                                                </span>
                                                {label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-foreground mb-2">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                                    }}
                                    className={`w-full px-4 py-3 rounded-xl border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                                        ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
                                        : 'border-border focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Repite tu contraseña"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-destructive">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {errors.general && (
                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                                    <p className="text-sm text-destructive">{errors.general}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || registrationSuccess}
                                className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creando cuenta...' : registrationSuccess ? 'Cuenta creada ✓' : 'Crear Cuenta'}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="text-primary hover:text-accent transition-colors">
                                    Iniciar sesión
                                </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                ¿Te registraste pero no recibiste el email?{' '}
                                <Link to="/resend-verification" className="text-primary hover:text-accent transition-colors">
                                    Reenviar verificación
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
