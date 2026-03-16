<?php

namespace App\Enums;

enum ProductType: string
{
    case Etb = 'etb';
    case Display = 'display';
    case Booster = 'booster';
    case Bundle = 'bundle';
    case Tin = 'tin';
    case Coffret = 'coffret';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Etb => 'ETB',
            self::Display => 'Display',
            self::Booster => 'Booster',
            self::Bundle => 'Bundle',
            self::Tin => 'Tin / Mini-Tin',
            self::Coffret => 'Coffret',
            self::Other => 'Autre',
        };
    }
}
