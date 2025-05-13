<?php

if (!function_exists('lang')) {
    /**
     * Récupère une traduction selon la langue courante ou une langue passée en paramètre.
     *
     * @param string $key
     * @param array $replace
     * @param string|null $locale
     * @return string
     */
    function lang(string $key, array $replace = [], string $locale = null): string
    {
        return __($key, $replace, $locale);
    }
} 