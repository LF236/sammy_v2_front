import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Package,
    Settings,
    Menu,
    X,
    LogOut,
    Activity,
    ChevronLeft,
    Building2,
    Bell,
    ChevronRight,
    User,
    ChevronDown,
    Sun,
    Moon,
} from 'lucide-react';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CompleteProfileModal } from '../components/CompleteProfileModal';
import { Footer } from '../components/Footer';

interface NavItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { path: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { path: '/app/appointments', label: 'Agenda', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { path: '/app/patients', label: 'Pacientes', icon: <Users className="w-[18px] h-[18px]" /> },
    { path: '/app/inventory', label: 'Inventario', icon: <Package className="w-[18px] h-[18px]" /> },
    { path: '/app/settings', label: 'Configuración', icon: <Settings className="w-[18px] h-[18px]" /> },
];

export const MainLayout = () => {
    const { user, selectedClinic, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showCompleteProfile, setShowCompleteProfile] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const currentPage = navItems.find(item => location.pathname.startsWith(item.path));

    const handleLogout = () => { logout(); navigate('/login'); };
    const handleChangeClinic = () => navigate('/select-clinic');
    const handleProfileComplete = () => {
        setShowCompleteProfile(false);
        if (!selectedClinic) navigate('/select-clinic');
    };

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        if (!user.profileCompleted) { setShowCompleteProfile(true); return; }
        if (user.profileCompleted && !selectedClinic) navigate('/select-clinic');
    }, [user, selectedClinic, navigate]);

    if (!user) return (
        <div className="app-shell h-screen flex items-center justify-center bg-background">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!user.profileCompleted) return (
        <>
            <CompleteProfileModal isOpen={showCompleteProfile} onComplete={handleProfileComplete} />
            <div className="app-shell h-screen flex items-center justify-center bg-background">
                <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Activity className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl text-foreground mb-2">Completa tu Perfil</h2>
                    <p className="text-sm text-muted-foreground">Necesitamos algunos datos adicionales para configurar tu cuenta.</p>
                </div>
            </div>
        </>
    );

    if (!selectedClinic) return (
        <div className="app-shell h-screen flex items-center justify-center bg-background">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    // const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const initials = "Pablo Vazquez Reyes".split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="app-shell h-screen flex overflow-hidden bg-background">

            {/* ── Sidebar desktop ─────────────────────────────────────────── */}
            <aside className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-[width] duration-300 ease-in-out overflow-hidden ${collapsed ? 'w-[68px]' : 'w-60'}`}>

                {/* Logo + colapsar */}
                <div className="h-14 flex items-center px-4 border-b border-sidebar-border flex-shrink-0">
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <svg width="28" height="28">
                            <image
                                href="/logo.png"
                                width="28"
                                height="28"
                            />
                        </svg>
                        {!collapsed && (
                            <div className="min-w-0">
                                <span className="text-sm font-semibold text-sidebar-foreground tracking-wide">SAMI</span>
                                <p className="text-[10px] text-muted-foreground leading-none mt-0.5 truncate">Sistema Médico</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>

                {/* Clínica — fondo transparente */}
                {!collapsed && (
                    <div className="px-4 py-2.5 border-b border-sidebar-border">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-muted-foreground leading-none">Centro de trabajo</p>
                                <p className="text-xs font-medium text-sidebar-foreground truncate mt-0.5">{selectedClinic.name}</p>
                            </div>
                            <button
                                onClick={handleChangeClinic}
                                className="text-[10px] text-primary hover:underline flex-shrink-0"
                            >
                                Cambiar
                            </button>
                        </div>
                    </div>
                )}

                {/* Navegación */}
                <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
                    {!collapsed && (
                        <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                            Menú
                        </p>
                    )}
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            title={collapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                    ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                } ${collapsed ? 'justify-center' : ''}`
                            }
                        >
                            <span className="flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">
                                {item.icon}
                            </span>
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* ── Mobile drawer ───────────────────────────────────────────── */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <aside className="relative z-10 w-64 h-full bg-sidebar flex flex-col shadow-2xl">
                        <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                                    <Activity className="w-4 h-4 text-primary-foreground" />
                                </div>
                                <span className="text-sm font-semibold text-sidebar-foreground">SAMI</span>
                            </div>
                            <button onClick={() => setMobileOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Clínica transparente en mobile */}
                        <div className="px-4 py-2.5 border-b border-sidebar-border">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-muted-foreground">Centro de trabajo</p>
                                    <p className="text-xs font-medium text-sidebar-foreground truncate">{selectedClinic.name}</p>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                            ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                        }`
                                    }
                                >
                                    <span className="flex-shrink-0 transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}

            {/* ── Contenido principal ─────────────────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Topbar */}
                <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="group lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-150"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 hidden sm:block">
                                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Notificaciones */}
                        <button className="group w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-150 relative">
                            <Bell className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        </button>

                        {/* Toggle de tema */}
                        <button
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                            className="group w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-150"
                        >
                            {theme === 'dark'
                                ? <Sun className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:rotate-12" />
                                : <Moon className="w-4 h-4 transition-transform duration-150 group-hover:scale-110 group-hover:-rotate-12" />
                            }
                        </button>

                        {/* Avatar + dropdown */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(v => !v)}
                                className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 hover:bg-muted hover:scale-105 active:scale-95 transition-all duration-150"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary-foreground text-xs font-semibold">{initials}</span>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 top-full mt-1.5 w-56 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                                    {/* Info del usuario */}
                                    <div className="px-4 py-3 border-b border-border">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary-foreground text-sm font-semibold">{initials}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        {user.role && (
                                            <p className="text-[11px] text-muted-foreground mt-2 capitalize">
                                                Rol: <span className="text-primary font-medium">{user.role}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Acciones */}
                                    <div className="p-1.5">
                                        <button
                                            onClick={() => { navigate('/app/settings'); setUserMenuOpen(false); }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                        >
                                            <Settings className="w-4 h-4" />
                                            Configuración
                                        </button>
                                        <button
                                            onClick={() => { navigate('/app/settings/users'); setUserMenuOpen(false); }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                        >
                                            <User className="w-4 h-4" />
                                            Mi Perfil
                                        </button>
                                    </div>

                                    <div className="p-1.5 border-t border-border">
                                        <button
                                            onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Contenido de página */}
                <main className="flex-1 overflow-y-auto bg-background">
                    <div className="p-4 lg:p-6 max-w-screen-2xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
