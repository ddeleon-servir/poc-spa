<?php
namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;

class RhCentroCosto
{
    #[Groups(['default'])]
    private ?int $id = null;

    #[Groups(['default'])]
    private ?int $empresaId = null;

    #[Groups(['default'])]
    private ?string $cuentaContable = null;

    #[Groups(['default'])]
    private ?string $descripcion = null;

    #[Groups(['default'])]
    private ?string $abreviatura = null;

    #[Groups(['default'])]
    private ?string $observaciones = null;

    #[Groups(['default'])]
    private ?int $numeroEmpleados = null;

    #[Groups(['default'])]
    private ?int $conteoEmpleados = null;

    #[Groups(['default'])]
    private ?bool $activo = null;

    #[Groups(['default'])]
    private ?string $createdBy = null;

    #[Groups(['default'])]
    private ?string $updatedBy = null;

    #[Groups(['default'])]
    private ?string $createdAt = null;

    #[Groups(['default'])]
    private ?string $updatedAt = null;

    #[Groups(['default'])]
    private ?int $orden = null;

    #[Groups(['default'])]
    private ?string $displayText = null;

    // Getters and Setters
    public function getId(): ?int { return $this->id; }
    public function setId(?int $id): self { $this->id = $id; return $this; }
    public function getEmpresaId(): ?int { return $this->empresaId; }
    public function setEmpresaId(?int $empresaId): self { $this->empresaId = $empresaId; return $this; }
    public function getCuentaContable(): ?string { return $this->cuentaContable; }
    public function setCuentaContable(?string $cuentaContable): self { $this->cuentaContable = $cuentaContable; return $this; }
    public function getDescripcion(): ?string { return $this->descripcion; }
    public function setDescripcion(?string $descripcion): self { $this->descripcion = $descripcion; return $this; }
    public function getAbreviatura(): ?string { return $this->abreviatura; }
    public function setAbreviatura(?string $abreviatura): self { $this->abreviatura = $abreviatura; return $this; }
    public function getObservaciones(): ?string { return $this->observaciones; }
    public function setObservaciones(?string $observaciones): self { $this->observaciones = $observaciones; return $this; }
    public function getNumeroEmpleados(): ?int { return $this->numeroEmpleados; }
    public function setNumeroEmpleados(?int $numeroEmpleados): self { $this->numeroEmpleados = $numeroEmpleados; return $this; }
    public function getConteoEmpleados(): ?int { return $this->conteoEmpleados; }
    public function setConteoEmpleados(?int $conteoEmpleados): self { $this->conteoEmpleados = $conteoEmpleados; return $this; }
    public function getActivo(): ?bool { return $this->activo; }
    public function setActivo(?bool $activo): self { $this->activo = $activo; return $this; }
    public function getCreatedBy(): ?string { return $this->createdBy; }
    public function setCreatedBy(?string $createdBy): self { $this->createdBy = $createdBy; return $this; }
    public function getUpdatedBy(): ?string { return $this->updatedBy; }
    public function setUpdatedBy(?string $updatedBy): self { $this->updatedBy = $updatedBy; return $this; }
    public function getCreatedAt(): ?string { return $this->createdAt; }
    public function setCreatedAt(?string $createdAt): self { $this->createdAt = $createdAt; return $this; }
    public function getUpdatedAt(): ?string { return $this->updatedAt; }
    public function setUpdatedAt(?string $updatedAt): self { $this->updatedAt = $updatedAt; return $this; }
    public function getOrden(): ?int { return $this->orden; }
    public function setOrden(?int $orden): self { $this->orden = $orden; return $this; }
    public function getDisplayText(): ?string { return $this->displayText; }
    public function setDisplayText(?string $displayText): self { $this->displayText = $displayText; return $this; }
}