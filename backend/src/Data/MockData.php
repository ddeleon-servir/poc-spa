<?php
namespace App\Data;

class MockData
{
    public static function getData(): array
    {
        return [
            'centrosCosto' => [
                [
                    'id' => 20,
                    'empresaId' => 2,
                    'cuentaContable' => null,
                    'descripcion' => 'Administración',
                    'abreviatura' => '100',
                    'observaciones' => '',
                    'numeroEmpleados' => 0,
                    'conteoEmpleados' => null,
                    'activo' => true,
                    'createdBy' => 'system',
                    'updatedBy' => 'LSARCENO',
                    'createdAt' => '2023-10-05 12:35:15',
                    'updatedAt' => '2024-10-01 12:07:50',
                    'orden' => 1,
                    'displayText' => '100 | Administración',
                ],
            ],
            'ubicaciones' => [
                [
                    'id' => 17,
                    'empresaId' => 2,
                    'abreviatura' => 'Ausencias y permisos',
                    'descripcion' => 'Ausencias y permisos',
                    'observaciones' => '',
                    'createdBy' => 'system',
                    'updatedBy' => 'system',
                    'createdAt' => '2023-10-10 12:54:12',
                    'updatedAt' => '2024-06-25 12:25:55',
                    'activo' => true,
                    'orden' => null,
                    'abreviaturaUbicacion' => 'Ausencias y permisos | Ausencias y permisos',
                ],
            ],
            'areas' => [
                [
                    'id' => 26,
                    'descripcion' => 'Válvula 15',
                    'abreviatura' => 'Valvula15',
                    'empresaId' => 2,
                    'observaciones' => '',
                    'activo' => true,
                    'createdBy' => 'AGARCIA',
                    'updatedBy' => 'AGARCIA',
                    'createdAt' => '2024-01-29 08:01:24',
                    'updatedAt' => '2024-01-29 08:01:24',
                    'descripcionArea' => 'Válvula 15',
                ],
            ],
            'contratos' => [
                [
                    'id' => 747,
                    'RhEmpleadoContratacionId' => 750,
                    'codigoEmpleadoContrato' => '100078',
                    'nombreEmpleadoContrato' => 'LUIS ALBERTO CHÁVEZ LÓPEZ',
                    'codigoNombreCompleto' => '100078 | LUIS ALBERTO CHÁVEZ LÓPEZ',
                ],
                [
                    'id' => 556,
                    'RhEmpleadoContratacionId' => 560,
                    'codigoEmpleadoContrato' => '100182',
                    'nombreEmpleadoContrato' => 'KARIN ELIZABETH CHINCHILLA VELIZ',
                    'codigoNombreCompleto' => '100182 | KARIN ELIZABETH CHINCHILLA VELIZ',
                ],
            ],
            'rubros' => [
                [
                    'id' => 69,
                    'nombre' => 'Arranque de Semilla',
                    'abreviatura' => '42215',
                    'descripcion' => 'Arranque de Semilla',
                    'activo' => true,
                    'unidadMedidaId' => 8,
                    'tarifaPorUnidad' => true,
                    'aplicaPrograma' => false,
                    'aplicaCurso' => false,
                    'aplicaAsistencia' => false,
                    'montoDirecto' => false,
                    'esRecurrente' => false,
                    'esOnline' => false,
                    'cuentaContable' => '',
                    'esExentoImpuestos' => false,
                    'afectaSoloBonificacionDecreto' => false,
                    'requiereDocumentoReferencia' => false,
                    'unidadMedidaString' => 'Unidad',
                    'createdBy' => 'AGARCIA',
                    'updatedBy' => 'AGARCIA',
                    'createdAt' => '2025-05-05 07:53:11',
                    'updatedAt' => '2025-05-05 07:54:08',
                    'abreviaturaNombre' => '42215 | Arranque de Semilla',
                    'centroCosto' => ['id' => 19],
                    'ubicacion' => ['id' => 12],
                ],
            ],
            'tarifas' => [
                [
                    'id' => 84,
                    'nombre' => '41614 2024',
                    'descripcion' => 'Regar Enmienda 2024',
                    'activo' => true,
                    'tarifa' => 3.18,
                    'fechaInicio' => '2024-01-01',
                    'fechaFin' => '2024-12-31',
                    'turnoId' => 1,
                    'estado' => null,
                    'rubro' => ['id' => 38],
                ],
            ],
            'regiones' => [
                ['id' => 1, 'abreviatura' => 'REG1', 'idAbreviatura' => '1 | REG1'],
            ],
        ];
    }
}