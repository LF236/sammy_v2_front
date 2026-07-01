// Sistema Administrativo Médico Integral (SAMI) - Tipos TypeScript

export type UserRole = 'admin' | 'doctor' | 'reception' | 'nurse';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type PermissionKey =
    | 'view_dashboard'
    | 'view_appointments'
    | 'create_appointments'
    | 'edit_appointments'
    | 'cancel_appointments'
    | 'view_patients'
    | 'create_patients'
    | 'edit_patients'
    | 'view_medical_records'
    | 'create_medical_records'
    | 'edit_medical_records'
    | 'view_inventory'
    | 'manage_inventory'
    | 'view_staff'
    | 'manage_staff'
    | 'view_settings'
    | 'manage_settings'
    | 'manage_roles'
    | 'view_reports';

export interface User {
    id: string;
    email: string;
    name: string;
    role?: UserRole;
    professionalId?: string;
    specialty?: string;
    photo?: string;
    clinicId?: string;
    profileCompleted?: boolean;
    emailVerified?: boolean;
}

export interface Clinic {
    id: string;
    name: string;
    logo?: string;
    address: string;
    phone: string;
    email: string;
    createdAt: Date;
}

export interface Patient {
    id: string;
    name: string;
    email?: string;
    phone: string;
    dateOfBirth: Date;
    address?: string;
    insuranceProvider?: string;
    insuranceNumber?: string;
    allergies?: string[];
    chronicConditions?: string[];
    clinicId: string;
    createdAt: Date;
}

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: Date;
    duration: number;
    status: AppointmentStatus;
    reason: string;
    roomNumber?: string;
    clinicId: string;
    notes?: string;
}

export interface MedicalRecord {
    id: string;
    patientId: string;
    appointmentId?: string;
    doctorId: string;
    date: Date;
    diagnosis: string;
    treatment: string;
    prescriptions?: Prescription[];
    notes?: string;
    clinicId: string;
}

export interface Prescription {
    id: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: 'medication' | 'equipment' | 'supplies';
    quantity: number;
    minQuantity: number;
    unit: string;
    expirationDate?: Date;
    clinicId: string;
    lastUpdated: Date;
}

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    professionalId?: string;
    specialty?: string;
    phone: string;
    photo?: string;
    clinicId: string;
    isActive: boolean;
    createdAt: Date;
}

export interface RolePermissions {
    role: UserRole;
    permissions: Record<PermissionKey, boolean>;
}

export interface DashboardStats {
    todayAppointments: number;
    newPatients: number;
    lowStockItems: number;
    pendingAppointments: number;
}

export interface Convenio {
    id: number; // Convenios usan number según especificación
    name: string;
    type: string;
    discount: number;
    clinicId: string;
}

// Estado de autenticación
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    selectedClinic: Clinic | null;
}

// Datos de login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Datos de registro
export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

// Datos para completar perfil
export interface CompleteProfileData {
    professionalId: string;
    specialty: string;
    role: UserRole;
    phone?: string;
}
