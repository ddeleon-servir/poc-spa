<?php

namespace App\Controller;

use App\Service\InertiaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/', name: 'app')]
    public function index(Request $request, InertiaService $inertia): Response
    {
        return $inertia->render($request, 'App', [
            'user' => $this->getUser() ? $this->getUser()->toArray() : null,
        ]);
    }
}