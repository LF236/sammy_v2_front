import React from 'react';
import { Card } from './Card';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    iconBgColor?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export const StatCard = ({
    title,
    value,
    icon,
    iconBgColor = 'bg-primary',
    trend
}: StatCardProps) => {
    return (
        <Card>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">{title}</p>
                        <p className="text-3xl text-foreground">{value}</p>
                        {trend && (
                            <div className="flex items-center gap-1 mt-2">
                                <span
                                    className={`text-xs ${trend.isPositive ? 'text-success' : 'text-destructive'
                                        }`}
                                >
                                    {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                                </span>
                                <span className="text-xs text-muted-foreground">vs mes anterior</span>
                            </div>
                        )}
                    </div>
                    <div className={`w-14 h-14 rounded-lg ${iconBgColor} flex items-center justify-center text-primary-foreground`}>
                        {icon}
                    </div>
                </div>
            </div>
        </Card>
    );
}
