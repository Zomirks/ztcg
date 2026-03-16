<?php

namespace App\Enums;

enum Language: string
{
    case French = 'fr';
    case English = 'en';
    case Japanese = 'jp';

    public function label(): string
    {
        return match ($this) {
            self::French => 'Français',
            self::English => 'Anglais',
            self::Japanese => 'Japonais',
        };
    }
}
