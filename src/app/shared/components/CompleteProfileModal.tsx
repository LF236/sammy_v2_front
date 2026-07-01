import React, { useState } from 'react';
import { X, User, IdCard, Stethoscope, Phone } from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { UserRole } from '../types';

interface CompleteProfileModalProps {
    isOpen: boolean;
    onComplete: () => void;
}

export const CompleteProfileModal = ({ isOpen, onComplete }: CompleteProfileModalProps) => {
    const { completeProfile, user } = useAuth();
    const [formData, setFormData] = useState({
        professionalId: '',
        specialty: '',
        role: 'doctor' as UserRole,
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.professionalId || !formData.specialty || !formData.role) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }

        if (formData.professionalId.length < 8) {
            setError('La cédula profesional debe tener al menos 8 caracteres');
            return;
        }

        setLoading(true);

        try {
            const success = await completeProfile(formData);
            if (success) {
                onComplete();
            } else {
                setError('Error al actualizar el perfil. Por favor intenta más tarde.');
            }
        } catch {
            setError('Error al conectar con el servidor. Por favor intenta más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-3xl shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border px-8 py-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl text-foreground mb-1">Completa tu Perfil</h2>
                            <p className="text-sm text-muted-foreground">
                                Necesitamos algunos datos adicionales para configurar tu cuenta
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled
                            className="w-10 h-10 rounded-full bg-muted/50 transition-colors flex items-center justify-center text-muted-foreground cursor-not-allowed opacity-50"
                            aria-label="Completar perfil es obligatorio"
                            title="Debes completar tu perfil para continuar"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                    {/* Información del usuario */}
                    <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Bienvenido</p>
                                <p className="text-foreground">{user?.name}</p>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-foreground mb-2">
                                Cédula Profesional <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <IdCard className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.professionalId}
                                    onChange={(e) => setFormData({ ...formData, professionalId: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Ej: 12345678"
                                    required
                                />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Tu número de cédula profesional o identificación
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-foreground mb-2">
                                Especialidad <span className="text-destructive">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Stethoscope className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.specialty}
                                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Ej: Medicina General, Cardiología"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-foreground mb-2">
                                Rol en el Sistema <span className="text-destructive">*</span>
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                required
                            >
                                <option value="doctor">Médico</option>
                                <option value="nurse">Enfermería</option>
                                <option value="reception">Recepción</option>
                                <option value="admin">Administrador</option>
                            </select>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Selecciona el rol que mejor describa tu función
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-foreground mb-2">
                                Teléfono (Opcional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="+52 55 1234 5678"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Guardando...' : 'Completar Perfil'}
                            </button>
                        </div>
                    </form>

                    {/* Información adicional */}
                    <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-xs text-muted-foreground mb-2">ℹ️ Información importante:</p>
                        <ul className="text-xs text-foreground space-y-1 list-disc list-inside">
                            <li>Estos datos son necesarios para acceder al sistema</li>
                            <li>Tu información será verificada por el administrador</li>
                            <li>Podrás actualizar estos datos más tarde en Configuración</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
