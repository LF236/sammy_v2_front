import { Footer } from "@/app/shared/components/Footer"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
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

            <Outlet />
            <Footer />
        </div>
    )
}