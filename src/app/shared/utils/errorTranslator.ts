// src/utils/errorTranslator.ts

export function translateApiError(error: string): string {
    if (!error) {
        return 'Ha ocurrido un error inesperado.';
    }

    const translations: Record<string, string> = {
        'User not verified, please check your email':
            'Tu cuenta aún no ha sido verificada. Revisa tu correo electrónico.',

        'Invalid credentials':
            'Correo electrónico o contraseña incorrectos.',

        'User not found':
            'No existe una cuenta con ese correo electrónico.',

        'Email already exists':
            'Ya existe una cuenta registrada con este correo.',

        'Token expired':
            'La sesión ha expirado. Inicia sesión nuevamente.',

        'Unauthenticated':
            'Debes iniciar sesión para continuar.',

        'Too many login attempts':
            'Has excedido el número de intentos permitidos. Inténtalo más tarde.',

        'User not found with this email, please try again.':
            'No se encontró una cuenta con este correo electrónico. Por favor verifica que sea correcto.',

        'This user is already verified, please login.':
            'Esta cuenta ya ha sido verificada. Inicia sesión para continuar.',
    };

    if (translations[error]) {
        return translations[error];
    }

    // ========================================
    // TOKEN YA EXISTENTE (DINÁMICO)
    // ========================================

    const validTokenMatch = error.match(
        /You already have a valid token.*after (.+?) from now\.?$/i
    );

    if (validTokenMatch) {
        let remainingTime = validTokenMatch[1];

        remainingTime = remainingTime
            .replace(/\bminute\b/gi, 'minuto')
            .replace(/\bminutes\b/gi, 'minutos')
            .replace(/\bsecond\b/gi, 'segundo')
            .replace(/\bseconds\b/gi, 'segundos')
            .replace(/\bhour\b/gi, 'hora')
            .replace(/\bhours\b/gi, 'horas')
            .replace(/\bday\b/gi, 'día')
            .replace(/\bdays\b/gi, 'días');

        return `Ya tienes un token válido. Revisa tu correo electrónico. Podrás solicitar uno nuevo dentro de ${remainingTime}.`;
    }

    return error;
}