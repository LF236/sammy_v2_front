import { useNavigate, Link } from 'react-router';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Patrón de fondo con líneas diagonales */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(93, 173, 169, 0.05), transparent)'
            }}></div>
            <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 60px,
          rgba(93, 173, 169, 0.02) 60px,
          rgba(93, 173, 169, 0.02) 120px
        )`
            }}></div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute top-20 left-10 w-20 h-20 border-4 border-primary/10 rounded-full"></div>
            <div className="absolute bottom-32 right-20 w-16 h-16 border-4 border-accent/10 rounded-lg rotate-45"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 border-4 border-primary/10 rounded-full"></div>

            {/* Contenedor principal */}
            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center">
                    {/* Logo */}
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
                            <svg width="50" height="50">
                                <image
                                    href="/logo.png"
                                    width="50"
                                    height="50"
                                />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl text-foreground">SAMI</h1>
                            <p className="text-xs text-muted-foreground">Sistema Médico Integral</p>
                        </div>
                    </div>

                    {/* Icono 404 */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-full mb-6">
                            <FileQuestion className="w-16 h-16 text-primary" />
                        </div>
                        <div className="relative">
                            <h2 className="text-8xl md:text-9xl text-primary/20 select-none">404</h2>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl md:text-5xl text-primary tracking-tight">Página no encontrada</span>
                            </div>
                        </div>
                    </div>

                    {/* Mensaje */}
                    <div className="mb-10">
                        <p className="text-lg text-muted-foreground mb-4">
                            Lo sentimos, no pudimos encontrar la página que buscas.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Es posible que la URL sea incorrecta o que la página haya sido movida.
                        </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border text-foreground rounded-xl hover:bg-muted transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver atrás
                        </button>
                        <Link to="/app/dashboard">
                            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 shadow-lg hover:shadow-xl">
                                <Home className="w-4 h-4" />
                                Ir al Dashboard
                            </button>
                        </Link>
                    </div>

                    {/* Enlaces rápidos */}
                    <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Search className="w-5 h-5 text-primary" />
                            <h3 className="text-foreground">¿Qué estabas buscando?</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                to="/app/dashboard"
                                className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Home className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-foreground">Dashboard</p>
                                        <p className="text-xs text-muted-foreground">Vista general</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to="/app/appointments"
                                className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-foreground">Agenda</p>
                                        <p className="text-xs text-muted-foreground">Citas médicas</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to="/app/patients"
                                className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-foreground">Pacientes</p>
                                        <p className="text-xs text-muted-foreground">Expedientes</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                to="/app/settings"
                                className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-foreground">Configuración</p>
                                        <p className="text-xs text-muted-foreground">Ajustes</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Ayuda */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            ¿Necesitas ayuda?{' '}
                            <button className="text-primary hover:text-accent transition-colors">
                                Contactar soporte
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
