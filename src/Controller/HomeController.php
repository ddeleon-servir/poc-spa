<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Rompetomp\InertiaBundle\Architecture\InertiaInterface;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(InertiaInterface $inertia): Response
    {
        return $inertia->render('Home', [
            'mensaje' => 'Hola desde Symfony'
        ]);
    }
}