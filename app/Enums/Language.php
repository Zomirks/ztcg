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

    public static function getOptions(): array
    {
        return array_map(fn (self $language) => [
            'label' => $language->label(),
            'value' => $language->value,
        ], self::cases());
    }
}
