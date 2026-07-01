import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./shared/layouts/AuthLayout";
import { MainLayout } from "./shared/layouts/MainLayout";
import { Login } from "./features/auth/pages/Login";
import { Register } from "./features/auth/pages/Register";
import { ResendVerification } from "./features/auth/pages/ResendVerification";
import { NotFound } from "./shared/pages/NotFound";
import { Dashboard } from "./features/dashboard/pages/Dashboard";
import { VerifyEmail } from "./features/auth/pages/VerifyEmail";
import { ClinicSelector } from "./features/clinic/pages/ClinicSelector";
import { Appointments } from "./features/appointments/pages/Appointments";
import { Patients } from "./features/patients/pages/Patients";
import { Inventory } from "./features/inventory/pages/Inventory";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'resend-verification',
                Component: ResendVerification
            },
            {
                path: 'verify-email',
                Component: VerifyEmail
            },
        ]
    },
    {
        path: 'select-clinic',
        Component: ClinicSelector
    },
    {
        path: "app",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: 'dashboard',
                Component: Dashboard
            },
            {
                path: 'appointments',
                Component: Appointments
            },
            {
                path: 'patients',
                Component: Patients
            },
            {
                path: 'inventory',
                Component: Inventory
            },
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
])