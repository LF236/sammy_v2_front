import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { mockClinics } from '../../../shared/data/mockData';
import { Card } from '../../../shared/components/Card';
import { Footer } from '../../../shared/components/Footer';
import { Button } from '../../../shared/components/Button';

export const ClinicSelector = () => {
    const navigate = useNavigate();
    const { user, selectClinic } = useAuth();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Redirigiendo...</p>
                </div>
            </div>
        );
    }

    const handleSelect = (clinicId: string) => {
        setSelectedId(clinicId);
    };

    const handleContinue = () => {
        const clinic = mockClinics.find(c => c.id === selectedId);
        if (clinic) {
            selectClinic(clinic);
            navigate('/app/dashboard');
        }
    };

    const handleCreateNew = () => {
        // En producción, esto abriría un modal o navegaría a una página de creación
        alert('Funcionalidad de crear nueva clínica - Por implementar');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <h1 className="text-2xl text-foreground">Bienvenido, {user.name}</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Selecciona el centro de trabajo al que deseas acceder
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
                <h2 className="text-xl text-foreground mb-6">Tus Centros de Trabajo</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cards de clínicas existentes */}
                    {mockClinics.map((clinic) => (
                        <Card
                            key={clinic.id}
                            hover
                            onClick={() => handleSelect(clinic.id)}
                            className={`cursor-pointer transition-all ${selectedId === clinic.id
                                ? 'ring-2 ring-primary shadow-lg'
                                : ''
                                }`}
                        >
                            <div className="p-6">
                                {/* Icono/Logo */}
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <Building2 className="w-8 h-8 text-primary" />
                                </div>

                                {/* Información */}
                                <h3 className="text-lg text-foreground mb-3">{clinic.name}</h3>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">{clinic.address}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">{clinic.phone}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">{clinic.email}</p>
                                    </div>
                                </div>

                                {selectedId === clinic.id && (
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <div className="flex items-center gap-2 text-primary">
                                            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                            </div>
                                            <span className="text-sm">Seleccionado</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}

                    {/* Card para crear nueva clínica */}
                    <Card
                        hover
                        onClick={handleCreateNew}
                        className="cursor-pointer border-2 border-dashed border-border hover:border-primary hover:bg-primary/5"
                    >
                        <div className="p-6 h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Plus className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-lg text-foreground mb-2">Crear Nueva Clínica</h3>
                            <p className="text-sm text-muted-foreground">
                                Configura un nuevo centro de trabajo
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Botón de continuar */}
                {selectedId && (
                    <div className="mt-8 flex justify-end">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleContinue}
                        >
                            Continuar al Sistema
                        </Button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
