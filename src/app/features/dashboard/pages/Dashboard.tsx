import React from 'react';
import {
    Calendar, Users, Package, Clock,
    AlertCircle, TrendingUp, ArrowUpRight, ArrowDownRight,
    CheckCircle2, Circle,
} from 'lucide-react';
import { mockDashboardStats, mockAppointments, mockInventory } from '../../../shared/data/mockData';
import { AppointmentStatus } from '../../../shared/types';

/* ── Tipos y helpers ─────────────────────────────────────────────── */
const statusMeta: Record<AppointmentStatus, { label: string; color: string; dot: string }> = {
    pending: { label: 'Pendiente', color: 'bg-warning/10 text-warning border border-warning/20', dot: 'bg-warning' },
    confirmed: { label: 'Confirmada', color: 'bg-success/10 text-success border border-success/20', dot: 'bg-success' },
    cancelled: { label: 'Cancelada', color: 'bg-destructive/10 text-destructive border border-destructive/20', dot: 'bg-destructive' },
    completed: { label: 'Completada', color: 'bg-muted text-muted-foreground border border-border', dot: 'bg-muted-foreground' },
};

const weeklyData = [
    { day: 'Lun', citas: 8 },
    { day: 'Mar', citas: 14 },
    { day: 'Mié', citas: 6 },
    { day: 'Jue', citas: 11 },
    { day: 'Vie', citas: 9 },
    { day: 'Sáb', citas: 4 },
    { day: 'Dom', citas: 1 },
];

const recentActivity = [
    { icon: <CheckCircle2 className="w-4 h-4 text-success" />, text: 'Nueva cita registrada', sub: 'Roberto Sánchez · Hace 2h' },
    { icon: <Circle className="w-4 h-4 text-info" />, text: 'Expediente actualizado', sub: 'María González · Hace 3h' },
    { icon: <AlertCircle className="w-4 h-4 text-warning" />, text: 'Alerta de inventario', sub: 'Jeringas desechables · Hace 5h' },
    { icon: <CheckCircle2 className="w-4 h-4 text-success" />, text: 'Cita completada', sub: 'Ana Martínez · Hace 6h' },
];

/* ── Subcomponentes ──────────────────────────────────────────────── */
function StatCard({
    title, value, subtitle, icon, trend, accentColor,
}: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: { value: number; positive: boolean };
    accentColor: string;
}) {
    return (
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${accentColor}`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-3xl font-semibold text-foreground leading-none">{value}</p>
                {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-success' : 'text-destructive'}`}>
                    {trend.positive
                        ? <ArrowUpRight className="w-3.5 h-3.5" />
                        : <ArrowDownRight className="w-3.5 h-3.5" />
                    }
                    <span>{Math.abs(trend.value)}% vs mes anterior</span>
                </div>
            )}
        </div>
    );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="mb-4">
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
    );
}

/* ── Gráfico de barras custom (sin recharts — evita bug de claves) ── */
function SimpleBarChart({ data }: { data: { day: string; citas: number }[] }) {
    const max = Math.max(...data.map(d => d.citas));
    return (
        <div className="flex items-end gap-1.5 h-36 pt-2">
            {data.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                    <span className="text-[10px] text-muted-foreground">{item.citas}</span>
                    <div className="w-full flex items-end" style={{ height: '96px' }}>
                        <div
                            className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors duration-150"
                            style={{ height: `${Math.round((item.citas / max) * 100)}%`, minHeight: '4px' }}
                        />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">{item.day}</span>
                </div>
            ))}
        </div>
    );
}

/* ── Dashboard principal ─────────────────────────────────────────── */
export const Dashboard = () => {
    const todayApts = mockAppointments.filter(a => {
        const today = new Date();
        return new Date(a.date).toDateString() === today.toDateString();
    });
    const lowStock = mockInventory.filter(i => i.quantity <= i.minQuantity);

    return (
        <div className="space-y-6">

            {/* Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Vista general de tu clínica</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Rendimiento mensual +18%
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Citas hoy"
                    value={mockDashboardStats.todayAppointments}
                    subtitle="Programadas para hoy"
                    icon={<Calendar className="w-4 h-4" />}
                    accentColor="bg-primary"
                    trend={{ value: 8, positive: true }}
                />
                <StatCard
                    title="Pacientes nuevos"
                    value={mockDashboardStats.newPatients}
                    subtitle="Este mes"
                    icon={<Users className="w-4 h-4" />}
                    accentColor="bg-success"
                    trend={{ value: 12, positive: true }}
                />
                <StatCard
                    title="Alertas inventario"
                    value={mockDashboardStats.lowStockItems}
                    subtitle="Bajo stock"
                    icon={<Package className="w-4 h-4" />}
                    accentColor="bg-warning"
                />
                <StatCard
                    title="Pendientes"
                    value={mockDashboardStats.pendingAppointments}
                    subtitle="Sin confirmar"
                    icon={<Clock className="w-4 h-4" />}
                    accentColor="bg-info"
                    trend={{ value: 3, positive: false }}
                />
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Bar chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                    <SectionHeader title="Citas por día" subtitle="Últimos 7 días" />
                    <SimpleBarChart data={weeklyData} />
                </div>

                {/* Activity feed */}
                <div className="bg-card border border-border rounded-xl p-5">
                    <SectionHeader title="Actividad reciente" />
                    <div className="space-y-3">
                        {recentActivity.map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-foreground leading-snug">{item.text}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Appointments + Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Appointments */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-foreground">Próximas consultas</h2>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Citas de hoy</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                            {todayApts.length} hoy
                        </span>
                    </div>

                    {todayApts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Calendar className="w-10 h-10 text-muted-foreground/40 mb-3" />
                            <p className="text-sm text-muted-foreground">No hay citas para hoy</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {todayApts.map(apt => {
                                const meta = statusMeta[apt.status];
                                return (
                                    <div key={apt.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/40 transition-colors">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-primary text-xs font-semibold">
                                                {apt.patientName.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{apt.patientName}</p>
                                            <p className="text-xs text-muted-foreground truncate">{apt.reason}</p>
                                        </div>
                                        <div className="flex-shrink-0 text-right hidden sm:block">
                                            <p className="text-xs font-medium text-foreground">
                                                {new Date(apt.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground">Sala {apt.roomNumber}</p>
                                        </div>
                                        <span className={`flex-shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${meta.color}`}>
                                            {meta.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Inventory alerts */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-border">
                        <h2 className="text-sm font-semibold text-foreground">Alertas de inventario</h2>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{lowStock.length} artículos con bajo stock</p>
                    </div>

                    {lowStock.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <Package className="w-9 h-9 text-success/40 mb-2" />
                            <p className="text-xs text-muted-foreground">Inventario en niveles óptimos</p>
                        </div>
                    ) : (
                        <div className="p-3 space-y-2">
                            {lowStock.map(item => (
                                <div key={item.id} className="flex items-start gap-2.5 p-3 rounded-lg bg-warning/8 border border-warning/15">
                                    <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                                        <p className="text-[11px] text-muted-foreground">
                                            Stock: {item.quantity} / Mín: {item.minQuantity} {item.unit}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
