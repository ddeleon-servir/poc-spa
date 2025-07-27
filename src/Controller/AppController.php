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
        $page = [
            'component' => 'App',
            'props' => [
                'user' => $this->getUser() ? $this->getUser()->toArray() : null,
            ],
            'url' => $request->getRequestUri(),
            'version' => '1.0',
        ];

        if ($request->headers->get('X-Inertia')) {
            return new Response(json_encode($page), 200, [
                'X-Inertia' => 'true',
                'Vary' => 'Accept',
                'Content-Type' => 'application/json',
            ]);
        }

        return $this->render('base.html.twig', [
            'page' => $page,
        ]);
    }
}