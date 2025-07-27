<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class InertiaService
{
    public function render(Request $request, string $component, array $props = []): JsonResponse
    {
        $page = [
            'component' => $component,
            'props' => $props,
            'url' => $request->getRequestUri(),
            'version' => '1.0',
        ];

        if ($request->headers->get('X-Inertia')) {
            return new JsonResponse($page, 200, [
                'X-Inertia' => 'true',
                'Vary' => 'Accept',
            ]);
        }

        return new JsonResponse($page);
    }
}