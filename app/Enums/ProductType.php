<?php

namespace App\Enums;

enum ProductType: string
{
    case Etb = 'etb';
    case Display = 'display';
    case Booster = 'booster';
    case Bundle = 'bundle';
    case Tin = 'tin';
    case MiniTin = 'minitin';
    case Coffret = 'coffret';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Etb => 'ETB',
            self::Display => 'Display',
            self::Booster => 'Booster',
            self::Bundle => 'Bundle',
            self::Tin => 'Tin',
            self::MiniTin => 'Mini-Tin',
            self::Coffret => 'Coffret',
            self::Other => 'Autre',
        };
    }

    public static function getOptions(): array
    {
        return array_map(fn (self $productType) => [
            'label' => $productType->label(),
            'value' => $productType->value,
        ], self::cases());
    }
}
