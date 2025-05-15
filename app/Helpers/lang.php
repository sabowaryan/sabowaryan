<?php

if (!function_exists('lang')) {
    /**
     * Charge un fichier de langue JSON depuis le dossier lang_path.
     *
     * @param string $key Clé de traduction au format 'fichier.cle'
     * @param array $replace Tableau associatif pour remplacer les placeholders
     * @param string|null $locale La locale à utiliser, null pour la locale par défaut
     * @return string|array
     */
    function lang($key, $replace = [], $locale = null)
    {
        static $cache = [];

        // Séparer la clé en fichier et sous-clé
        $parts = explode('.', $key);
        $file = array_shift($parts);
        $translationKey = implode('.', $parts);

        // Déterminer la locale
        $locale = $locale ?? app()->getLocale();
        
       
        // Clé de cache
        $cacheKey = "$locale.$file";

        // Vérifier si le fichier est déjà en cache
        if (!isset($cache[$cacheKey])) {
            // Chemin du fichier de langue
            $path = lang_path("$locale/$file.json");
          // Charger le fichier JSON si existant
            if (file_exists($path)) {
                $content = file_get_contents($path);
                $translations = json_decode($content, true);

                // Vérifier les erreurs de décodage JSON
                if (json_last_error() !== JSON_ERROR_NONE) {
                    // Log l'erreur si nécessaire
                    \Illuminate\Support\Facades\Log::error("Erreur de décodage JSON pour le fichier de langue $path: " . json_last_error_msg());
                    return $key;
                }

                $cache[$cacheKey] = $translations;
                
                // Debug - Log le nombre de traductions chargées
                $count = is_array($translations) ? count($translations) : 0;
               
                if ($count > 0) {
                    \Illuminate\Support\Facades\Log::info("Lang helper: exemple de clés = " . implode(', ', array_slice(array_keys($translations), 0, 5)));
                }
            } else {
                // Si le fichier n'existe pas, retourner la clé
                \Illuminate\Support\Facades\Log::error("Lang helper: fichier de langue introuvable - {$path}");
                return $key;
            }
        } else {
            \Illuminate\Support\Facades\Log::info("Lang helper: utilisation du cache pour {$cacheKey}");
        }

        $translations = $cache[$cacheKey];

        // Si une sous-clé est spécifiée, la rechercher dans le tableau
        if ($translationKey) {
            $translation = array_reduce(
                explode('.', $translationKey),
                function ($carry, $item) {
                    return is_array($carry) && isset($carry[$item]) ? $carry[$item] : null;
                },
                $translations
            );

            // Remplacer les placeholders si nécessaire
            if (is_string($translation)) {
                foreach ($replace as $search => $value) {
                    $translation = str_replace(':' . $search, $value, $translation);
                }
                return $translation;
            }

            return $translation ?? $key;
        }

        return $translations;
    }
}
