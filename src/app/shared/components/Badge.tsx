import React, { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge = ({ variant = 'default', className = '', children, ...props }: BadgeProps) => {
    const variants = {
        default: 'bg-secondary text-secondary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger: 'bg-destructive text-destructive-foreground',
        info: 'bg-info text-info-foreground'
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}
