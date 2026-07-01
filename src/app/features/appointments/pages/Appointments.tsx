import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
import { mockAppointments } from '../../../shared/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { AppointmentStatus } from '../../../shared/types';

const statusColors: Record<AppointmentStatus, 'default' | 'success' | 'warning' | 'danger'> = {
    pending: 'warning',
    confirmed: 'success',
    cancelled: 'danger',
    completed: 'default'
};

const statusLabels: Record<AppointmentStatus, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Completada'
};

export const Appointments = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
    const [selectedDoctor, setSelectedDoctor] = useState<string>('all');

    const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Obtener días de la semana
    const getWeekDays = () => {
        const days = [];
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const weekDays = getWeekDays();

    // Filtrar citas por día
    const getAppointmentsForDay = (date: Date) => {
        return mockAppointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate.toDateString() === date.toDateString();
        });
    };

    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8am a 8pm

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl text-foreground mb-1">Agenda</h1>
                    <p className="text-muted-foreground">Gestión de citas médicas</p>
                </div>
                <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Nueva Cita
                </Button>
            </div>

            {/* Controles */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Navegación de fecha */}
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-foreground min-w-[200px] text-center capitalize">
                                {monthName}
                            </span>
                            <Button variant="outline" size="sm" onClick={goToNextWeek}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={goToToday}>
                                Hoy
                            </Button>
                        </div>

                        {/* Filtros */}
                        <div className="flex items-center gap-3">
                            <select
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                className="px-3 py-1.5 text-sm rounded-lg border border-border bg-input-background text-foreground"
                            >
                                <option value="all">Todos los médicos</option>
                                <option value="1">Dr. Carlos García</option>
                                <option value="2">Dra. Laura Hernández</option>
                            </select>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4" />
                                Filtros
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Vista de Calendario Semanal */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                            {/* Encabezado de días */}
                            <div className="grid grid-cols-8 border-b border-border">
                                <div className="p-3 border-r border-border bg-muted">
                                    <span className="text-sm text-muted-foreground">Hora</span>
                                </div>
                                {weekDays.map((day, idx) => {
                                    const isToday = day.toDateString() === new Date().toDateString();
                                    return (
                                        <div
                                            key={idx}
                                            className={`p-3 text-center border-r border-border ${isToday ? 'bg-primary/5' : 'bg-muted'
                                                }`}
                                        >
                                            <div className="text-xs text-muted-foreground mb-1">
                                                {day.toLocaleDateString('es-ES', { weekday: 'short' })}
                                            </div>
                                            <div
                                                className={`text-sm ${isToday
                                                    ? 'w-8 h-8 mx-auto flex items-center justify-center rounded-full bg-primary text-primary-foreground'
                                                    : 'text-foreground'
                                                    }`}
                                            >
                                                {day.getDate()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Cuadrícula de horas */}
                            <div className="max-h-[600px] overflow-y-auto">
                                {hours.map((hour) => (
                                    <div key={hour} className="grid grid-cols-8 border-b border-border min-h-[80px]">
                                        <div className="p-2 border-r border-border bg-muted/50">
                                            <span className="text-sm text-muted-foreground">
                                                {hour}:00
                                            </span>
                                        </div>
                                        {weekDays.map((day, dayIdx) => {
                                            const appointments = getAppointmentsForDay(day).filter(apt => {
                                                const aptHour = new Date(apt.date).getHours();
                                                return aptHour === hour;
                                            });

                                            return (
                                                <div
                                                    key={dayIdx}
                                                    className="p-1 border-r border-border hover:bg-muted/30 transition-colors cursor-pointer relative"
                                                >
                                                    {appointments.map((apt) => (
                                                        <div
                                                            key={apt.id}
                                                            className={`p-2 rounded-lg text-xs mb-1 ${apt.status === 'confirmed'
                                                                ? 'bg-success/10 border border-success/20'
                                                                : apt.status === 'pending'
                                                                    ? 'bg-warning/10 border border-warning/20'
                                                                    : apt.status === 'cancelled'
                                                                        ? 'bg-destructive/10 border border-destructive/20'
                                                                        : 'bg-muted border border-border'
                                                                }`}
                                                        >
                                                            <p className="truncate text-foreground">
                                                                {new Date(apt.date).toLocaleTimeString('es-ES', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </p>
                                                            <p className="truncate text-foreground mt-0.5">
                                                                {apt.patientName}
                                                            </p>
                                                            <p className="truncate text-muted-foreground mt-0.5">
                                                                {apt.reason}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de Citas */}
            <Card>
                <CardHeader>
                    <CardTitle>Todas las Citas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left p-3 text-sm text-muted-foreground">Fecha/Hora</th>
                                    <th className="text-left p-3 text-sm text-muted-foreground">Paciente</th>
                                    <th className="text-left p-3 text-sm text-muted-foreground">Médico</th>
                                    <th className="text-left p-3 text-sm text-muted-foreground">Motivo</th>
                                    <th className="text-left p-3 text-sm text-muted-foreground">Sala</th>
                                    <th className="text-left p-3 text-sm text-muted-foreground">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockAppointments.map((apt) => (
                                    <tr key={apt.id} className="border-b border-border hover:bg-muted/50">
                                        <td className="p-3">
                                            <div className="text-sm text-foreground">
                                                {new Date(apt.date).toLocaleDateString('es-ES')}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(apt.date).toLocaleTimeString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-foreground">{apt.patientName}</td>
                                        <td className="p-3 text-sm text-foreground">{apt.doctorName}</td>
                                        <td className="p-3 text-sm text-foreground">{apt.reason}</td>
                                        <td className="p-3 text-sm text-foreground">{apt.roomNumber}</td>
                                        <td className="p-3">
                                            <Badge variant={statusColors[apt.status]}>
                                                {statusLabels[apt.status]}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
