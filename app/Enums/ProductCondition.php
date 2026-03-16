<?php

namespace App\Enums;

enum ProductCondition: string
{
    case Sealed = 'sealed';
    case Opened = 'opened';

    public function label(): string
    {
        return match ($this) {
            self::Sealed => 'Scellé',
            self::Opened => 'Ouvert',
        };
    }
}
