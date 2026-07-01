import React from 'react';
import { Plus, Package, AlertTriangle } from 'lucide-react';
import { mockInventory } from '../../../shared/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';

const categoryLabels = {
    medication: 'Medicamento',
    equipment: 'Equipo',
    supplies: 'Insumo'
};

const categoryColors = {
    medication: 'bg-primary/10 text-primary',
    equipment: 'bg-info/10 text-info',
    supplies: 'bg-success/10 text-success'
};

export const Inventory = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl text-foreground mb-1">Inventario</h1>
                    <p className="text-muted-foreground">Control de medicamentos y equipos</p>
                </div>
                <Button variant="primary">
                    <Plus className="w-4 h-4" />
                    Agregar Item
                </Button>
            </div>

            {/* Tabla de Inventario */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="text-left p-4 text-sm text-muted-foreground">Nombre</th>
                                    <th className="text-left p-4 text-sm text-muted-foreground">Categoría</th>
                                    <th className="text-left p-4 text-sm text-muted-foreground">Cantidad</th>
                                    <th className="text-left p-4 text-sm text-muted-foreground">Mínimo</th>
                                    <th className="text-left p-4 text-sm text-muted-foreground">Estado</th>
                                    <th className="text-left p-4 text-sm text-muted-foreground">Vencimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockInventory.map((item) => {
                                    const isLowStock = item.quantity <= item.minQuantity;
                                    const stockPercentage = (item.quantity / item.minQuantity) * 100;

                                    return (
                                        <tr key={item.id} className="border-b border-border hover:bg-muted/30">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <span className="text-sm text-foreground">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs ${categoryColors[item.category]
                                                        }`}
                                                >
                                                    {categoryLabels[item.category]}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-foreground">
                                                    {item.quantity} {item.unit}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {item.minQuantity} {item.unit}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {isLowStock ? (
                                                    <div className="flex items-center gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-warning" />
                                                        <Badge variant="warning">Stock Bajo</Badge>
                                                    </div>
                                                ) : (
                                                    <Badge variant="success">Óptimo</Badge>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {item.expirationDate ? (
                                                    <span className="text-sm text-foreground">
                                                        {new Date(item.expirationDate).toLocaleDateString('es-ES')}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                                <p className="text-2xl text-foreground">{mockInventory.length}</p>
                            </div>
                            <Package className="w-8 h-8 text-primary" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Stock Bajo</p>
                                <p className="text-2xl text-warning">
                                    {mockInventory.filter(i => i.quantity <= i.minQuantity).length}
                                </p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-warning" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Categorías</p>
                                <p className="text-2xl text-foreground">3</p>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-2 h-8 rounded bg-primary"></div>
                                <div className="w-2 h-8 rounded bg-info"></div>
                                <div className="w-2 h-8 rounded bg-success"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
