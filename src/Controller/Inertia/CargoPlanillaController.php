<?php
namespace App\Controller\Inertia;

use App\Data\MockData;
use Rompetomp\InertiaBundle\Architecture\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CargoPlanillaController extends AbstractController
{
    public function __construct(private InertiaInterface $inertia)
    {
    }

    #[Route('/inertia-react', name: 'app_inertia_react')]
    public function inertiaReact(): Response {
        $response = $this->inertia->render('Inicio', ['testProp' => 'Hello']);
        error_log('Page JSON: ' . json_encode($response->getContent()));
        return $response;
    }

    #[Route('/inertia-react-test', name: 'app_inertia_react_test')]
    public function inertiaReactTest(): Response {
        $response = $this->inertia->render('Test', ['testProp' => 'Test']);
        error_log('Page JSON: ' . json_encode($response->getContent()));
        return $response;
    }

    #[Route('/cargo-planilla/{id?}', name: 'inertia_cargo_planilla')]
    public function index(?int $id = null): Response
    {
        $data = MockData::getData();
        return $this->inertia->render('CargoPlanilla/Index', [
            'cargoPlanillaId' => $id,
            'centrosCosto' => $data['centrosCosto'],
            'ubicaciones' => $data['ubicaciones'],
            'areas' => $data['areas'],
            'contratos' => $data['contratos'],
            'rubros' => $data['rubros'],
            'tarifas' => $data['tarifas'],
            'regiones' => $data['regiones'],
        ]);
    }

    #[Route('/cargo-planilla', name: 'inertia_cargo_planilla_store', methods: ['POST'])]
    public function store(Request $request): Response
    {
        $data = $request->all();
        // Simulate saving data
        $this->addFlash('success', 'Cargo de planilla guardado con éxito');
        return $this->inertia->location($request->input('saveAndAdd') ? '/cargo-planilla' : '/');
    }
}