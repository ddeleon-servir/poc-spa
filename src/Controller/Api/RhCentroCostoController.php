<?php
namespace App\Controller\Api;

use App\Data\MockData;
use App\Entity\RhCentroCosto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/centro-costo')]
class RhCentroCostoController extends AbstractController
{
    #[Route('', name: 'api_centro_costo_index', methods: ['GET'])]
    public function index(SerializerInterface $serializer): JsonResponse
    {
        $data = MockData::getData()['centrosCosto'];
        $centros = [];
        foreach ($data as $item) {
            $centro = new RhCentroCosto();
            $centro->setId($item['id'])
                   ->setEmpresaId($item['empresaId'])
                   ->setCuentaContable($item['cuentaContable'])
                   ->setDescripcion($item['descripcion'])
                   ->setAbreviatura($item['abreviatura'])
                   ->setObservaciones($item['observaciones'])
                   ->setNumeroEmpleados($item['numeroEmpleados'])
                   ->setConteoEmpleados($item['conteoEmpleados'])
                   ->setActivo($item['activo'])
                   ->setCreatedBy($item['createdBy'])
                   ->setUpdatedBy($item['updatedBy'])
                   ->setCreatedAt($item['createdAt'])
                   ->setUpdatedAt($item['updatedAt'])
                   ->setOrden($item['orden'])
                   ->setDisplayText($item['displayText']);
            $centros[] = $centro;
        }
        $json = $serializer->serialize($centros, 'json', ['groups' => 'default']);
        return new JsonResponse($json, 200, [], true);
    }
}