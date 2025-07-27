<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class InertiaService
{
    public function render(Request $request, string $component, array $props = []): array
    {
        return [
            'component' => $component,
            'props' => $props,
            'url' => $request->getRequestUri(),
            'version' => '1.0',
        ];
    }
}