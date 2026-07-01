import React, { useState } from 'react';
import { Plus, Search, Phone, Mail } from 'lucide-react';
import { mockPatients } from '../../../shared/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';

export const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl text-foreground mb-1">Pacientes</h1>
                    <p className="text-muted-foreground">Gestión de expedientes</p>
                </div>
                <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Nuevo Paciente
                </Button>
            </div>

            {/* Búsqueda */}
            <Card>
                <CardContent className="p-4">
                    <Input
                        type="text"
                        placeholder="Buscar por nombre o teléfono..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search className="w-4 h-4" />}
                    />
                </CardContent>
            </Card>

            {/* Lista de Pacientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                    <Card key={patient.id} hover>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg text-primary">
                                        {patient.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-foreground mb-2">{patient.name}</h3>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone className="w-3.5 h-3.5" />
                                            <span>{patient.phone}</span>
                                        </div>
                                        {patient.email && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Mail className="w-3.5 h-3.5" />
                                                <span className="truncate">{patient.email}</span>
                                            </div>
                                        )}
                                    </div>
                                    {patient.allergies && patient.allergies.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Alergias:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {patient.allergies.map((allergy, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded text-xs bg-destructive/10 text-destructive"
                                                    >
                                                        {allergy}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-xs text-muted-foreground mb-1">Condiciones:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {patient.chronicConditions.map((condition, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 rounded text-xs bg-warning/10 text-warning"
                                                    >
                                                        {condition}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPatients.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground">No se encontraron pacientes</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
