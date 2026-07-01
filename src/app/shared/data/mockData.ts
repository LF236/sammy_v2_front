// Mock Data para SAMI

import {
    User,
    Clinic,
    Patient,
    Appointment,
    RolePermissions,
    DashboardStats,
    InventoryItem,
    StaffMember,
    PermissionKey,
    UserRole
} from '../types';

export const mockUser: User = {
    id: '1',
    email: 'dr.garcia@sami.com',
    name: 'Dr. Carlos García',
    role: 'doctor',
    professionalId: '12345678',
    specialty: 'Medicina General',
    clinicId: '1',
    profileCompleted: true,
    emailVerified: true
};

export const mockClinics: Clinic[] = [
    {
        id: '1',
        name: 'Clínica San Rafael',
        address: 'Av. Principal 123, Ciudad de México',
        phone: '+52 55 1234 5678',
        email: 'contacto@sanrafael.com',
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Hospital Central',
        address: 'Calle Secundaria 456, Ciudad de México',
        phone: '+52 55 8765 4321',
        email: 'info@hospitalcentral.com',
        createdAt: new Date('2023-06-20')
    },
    {
        id: '3',
        name: 'Centro Médico Integral',
        address: 'Av. Reforma 789, Ciudad de México',
        phone: '+52 55 5555 5555',
        email: 'info@cmi.com',
        createdAt: new Date('2024-03-10')
    }
];

export const mockPatients: Patient[] = [
    {
        id: 'p1',
        name: 'María González',
        email: 'maria.g@email.com',
        phone: '+52 55 1111 1111',
        dateOfBirth: new Date('1985-05-15'),
        address: 'Col. Centro, CDMX',
        insuranceProvider: 'Seguros del Sur',
        insuranceNumber: 'SS-123456',
        allergies: ['Penicilina'],
        chronicConditions: ['Hipertensión'],
        clinicId: '1',
        createdAt: new Date('2024-01-20')
    },
    {
        id: 'p2',
        name: 'Juan Pérez',
        phone: '+52 55 2222 2222',
        dateOfBirth: new Date('1990-08-22'),
        clinicId: '1',
        createdAt: new Date('2024-02-10')
    },
    {
        id: 'p3',
        name: 'Ana Martínez',
        email: 'ana.m@email.com',
        phone: '+52 55 3333 3333',
        dateOfBirth: new Date('1978-12-03'),
        insuranceProvider: 'MetLife',
        insuranceNumber: 'ML-789012',
        allergies: ['Aspirina', 'Mariscos'],
        clinicId: '1',
        createdAt: new Date('2024-03-05')
    },
    {
        id: 'p4',
        name: 'Roberto Sánchez',
        phone: '+52 55 4444 4444',
        dateOfBirth: new Date('1995-03-17'),
        chronicConditions: ['Diabetes Tipo 2'],
        clinicId: '1',
        createdAt: new Date('2026-04-01')
    }
];

export const mockAppointments: Appointment[] = [
    {
        id: 'a1',
        patientId: 'p1',
        patientName: 'María González',
        doctorId: '1',
        doctorName: 'Dr. Carlos García',
        date: new Date('2026-04-09T10:00:00'),
        duration: 30,
        status: 'confirmed',
        reason: 'Consulta de control',
        roomNumber: '101',
        clinicId: '1'
    },
    {
        id: 'a2',
        patientId: 'p2',
        patientName: 'Juan Pérez',
        doctorId: '1',
        doctorName: 'Dr. Carlos García',
        date: new Date('2026-04-09T11:00:00'),
        duration: 30,
        status: 'pending',
        reason: 'Primera consulta',
        roomNumber: '101',
        clinicId: '1'
    },
    {
        id: 'a3',
        patientId: 'p3',
        patientName: 'Ana Martínez',
        doctorId: '2',
        doctorName: 'Dra. Laura Hernández',
        date: new Date('2026-04-09T14:30:00'),
        duration: 45,
        status: 'confirmed',
        reason: 'Seguimiento alergias',
        roomNumber: '102',
        clinicId: '1'
    },
    {
        id: 'a4',
        patientId: 'p4',
        patientName: 'Roberto Sánchez',
        doctorId: '1',
        doctorName: 'Dr. Carlos García',
        date: new Date('2026-04-09T16:00:00'),
        duration: 30,
        status: 'pending',
        reason: 'Control diabetes',
        roomNumber: '101',
        clinicId: '1'
    },
    {
        id: 'a5',
        patientId: 'p1',
        patientName: 'María González',
        doctorId: '1',
        doctorName: 'Dr. Carlos García',
        date: new Date('2026-04-10T09:00:00'),
        duration: 30,
        status: 'confirmed',
        reason: 'Resultados de laboratorio',
        roomNumber: '101',
        clinicId: '1'
    }
];

export const mockDashboardStats: DashboardStats = {
    todayAppointments: 4,
    newPatients: 1,
    lowStockItems: 3,
    pendingAppointments: 2
};

export const mockInventory: InventoryItem[] = [
    {
        id: 'i1',
        name: 'Paracetamol 500mg',
        category: 'medication',
        quantity: 150,
        minQuantity: 100,
        unit: 'tabletas',
        expirationDate: new Date('2027-12-31'),
        clinicId: '1',
        lastUpdated: new Date('2026-04-05')
    },
    {
        id: 'i2',
        name: 'Jeringas desechables',
        category: 'supplies',
        quantity: 45,
        minQuantity: 50,
        unit: 'unidades',
        clinicId: '1',
        lastUpdated: new Date('2026-04-08')
    },
    {
        id: 'i3',
        name: 'Tensiómetro digital',
        category: 'equipment',
        quantity: 3,
        minQuantity: 2,
        unit: 'unidades',
        clinicId: '1',
        lastUpdated: new Date('2026-03-15')
    },
    {
        id: 'i4',
        name: 'Alcohol etílico 70%',
        category: 'supplies',
        quantity: 8,
        minQuantity: 10,
        unit: 'litros',
        expirationDate: new Date('2028-06-30'),
        clinicId: '1',
        lastUpdated: new Date('2026-04-07')
    }
];

export const mockStaff: StaffMember[] = [
    {
        id: 's1',
        name: 'Dr. Carlos García',
        email: 'dr.garcia@sami.com',
        role: 'doctor',
        professionalId: '12345678',
        specialty: 'Medicina General',
        phone: '+52 55 1234 5678',
        clinicId: '1',
        isActive: true,
        createdAt: new Date('2024-01-15')
    },
    {
        id: 's2',
        name: 'Dra. Laura Hernández',
        email: 'dra.hernandez@sami.com',
        role: 'doctor',
        professionalId: '87654321',
        specialty: 'Alergología',
        phone: '+52 55 2345 6789',
        clinicId: '1',
        isActive: true,
        createdAt: new Date('2024-02-01')
    },
    {
        id: 's3',
        name: 'Patricia López',
        email: 'p.lopez@sami.com',
        role: 'reception',
        phone: '+52 55 3456 7890',
        clinicId: '1',
        isActive: true,
        createdAt: new Date('2024-01-20')
    },
    {
        id: 's4',
        name: 'Enf. Roberto Díaz',
        email: 'r.diaz@sami.com',
        role: 'nurse',
        professionalId: '56781234',
        phone: '+52 55 4567 8901',
        clinicId: '1',
        isActive: true,
        createdAt: new Date('2024-02-15')
    }
];

// Permisos por defecto para cada rol
const allPermissions: PermissionKey[] = [
    'view_dashboard',
    'view_appointments',
    'create_appointments',
    'edit_appointments',
    'cancel_appointments',
    'view_patients',
    'create_patients',
    'edit_patients',
    'view_medical_records',
    'create_medical_records',
    'edit_medical_records',
    'view_inventory',
    'manage_inventory',
    'view_staff',
    'manage_staff',
    'view_settings',
    'manage_settings',
    'manage_roles',
    'view_reports'
];

const createPermissions = (allowedPerms: PermissionKey[]): Record<PermissionKey, boolean> => {
    const perms = {} as Record<PermissionKey, boolean>;
    allPermissions.forEach(perm => {
        perms[perm] = allowedPerms.includes(perm);
    });
    return perms;
};

export const defaultRolePermissions: Record<UserRole, RolePermissions> = {
    admin: {
        role: 'admin',
        permissions: createPermissions(allPermissions)
    },
    doctor: {
        role: 'doctor',
        permissions: createPermissions([
            'view_dashboard',
            'view_appointments',
            'create_appointments',
            'edit_appointments',
            'view_patients',
            'create_patients',
            'edit_patients',
            'view_medical_records',
            'create_medical_records',
            'edit_medical_records',
            'view_inventory',
            'view_reports'
        ])
    },
    reception: {
        role: 'reception',
        permissions: createPermissions([
            'view_dashboard',
            'view_appointments',
            'create_appointments',
            'edit_appointments',
            'cancel_appointments',
            'view_patients',
            'create_patients',
            'edit_patients',
            'view_inventory'
        ])
    },
    nurse: {
        role: 'nurse',
        permissions: createPermissions([
            'view_dashboard',
            'view_appointments',
            'view_patients',
            'view_medical_records',
            'view_inventory'
        ])
    }
};

// Nombres legibles de permisos
export const permissionLabels: Record<PermissionKey, string> = {
    view_dashboard: 'Ver Dashboard',
    view_appointments: 'Ver Citas',
    create_appointments: 'Crear Citas',
    edit_appointments: 'Editar Citas',
    cancel_appointments: 'Cancelar Citas',
    view_patients: 'Ver Pacientes',
    create_patients: 'Crear Pacientes',
    edit_patients: 'Editar Pacientes',
    view_medical_records: 'Ver Expedientes',
    create_medical_records: 'Crear Expedientes',
    edit_medical_records: 'Editar Expedientes',
    view_inventory: 'Ver Inventario',
    manage_inventory: 'Gestionar Inventario',
    view_staff: 'Ver Personal',
    manage_staff: 'Gestionar Personal',
    view_settings: 'Ver Configuración',
    manage_settings: 'Gestionar Configuración',
    manage_roles: 'Gestionar Roles',
    view_reports: 'Ver Reportes'
};
