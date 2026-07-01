import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export const Card = ({ hover = false, className = '', children, ...props }: CardProps) => {
    return (
        <div
            className={`
        bg-card rounded-lg border border-border shadow-sm
        ${hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
}

export const CardHeader = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export const CardTitle = ({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h3 className={`text-lg text-card-foreground ${className}`} {...props}>
            {children}
        </h3>
    );
}

export const CardDescription = ({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={`text-sm text-muted-foreground mt-1 ${className}`} {...props}>
            {children}
        </p>
    );
}

export const CardContent = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 pb-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export const CardFooter = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`px-6 py-4 border-t border-border ${className}`} {...props}>
            {children}
        </div>
    );
}
