<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - {{ $personalInfo['name'] }}</title>
    <style>
        /* Variables de style basées sur les options */
        :root {
            --primary-color: {{ $options['primaryColor'] ?? '#c51f5d' }};
            --secondary-color: {{ $options['secondaryColor'] ?? '#243447' }};
            --spacing: {{ $options['spacing'] === 'compact' ? '8pt' : ($options['spacing'] === 'spacious' ? '18pt' : '12pt') }};
        }
        
        /* Style général pour Word - plus simple que PDF */
        body {
            font-family: 'Calibri', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        
        /* Conteneur principal */
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 24pt;
            box-sizing: border-box;
        }
        
        /* En-tête */
        .header {
            margin-bottom: var(--spacing);
            text-align: {{ $options['headerStyle'] === 'centered' ? 'center' : 'left' }};
        }
        
        .name {
            font-size: 24pt;
            font-weight: bold;
            color: {{ $options['primaryColor'] ?? '#c51f5d' }};
            margin: 0;
            margin-bottom: 4pt;
        }
        
        .title {
            font-size: 14pt;
            color: {{ $options['secondaryColor'] ?? '#243447' }};
            margin: 0;
            margin-bottom: 8pt;
        }
        
        .photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: {{ $options['headerStyle'] === 'centered' ? '0 auto 12pt' : '0 12pt 12pt 0' }};
            border: 3pt solid {{ $options['primaryColor'] ?? '#c51f5d' }};
        }
        
        /* Informations de contact */
        .contact-info {
            margin-bottom: var(--spacing);
        }
        
        .contact-item {
            margin-bottom: 4pt;
        }
        
        .contact-label {
            font-weight: bold;
            color: {{ $options['primaryColor'] ?? '#c51f5d' }};
        }
        
        /* Sections */
        .section {
            margin-bottom: calc(var(--spacing) * 1.5);
            @if($options['sectionStyle'] === 'underlined')
                border-bottom: 1.5pt solid {{ $options['primaryColor'] ?? '#c51f5d' }};
                padding-bottom: 8pt;
            @endif
        }
        
        .section-title {
            color: {{ $options['primaryColor'] ?? '#c51f5d' }};
            font-size: 14pt;
            margin-top: 0;
            margin-bottom: 8pt;
            font-weight: bold;
        }
        
        /* Expérience et Éducation */
        .experience-item, .education-item {
            margin-bottom: var(--spacing);
        }
        
        .item-header {
            margin-bottom: 4pt;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 12pt;
            color: {{ $options['secondaryColor'] ?? '#243447' }};
            margin-bottom: 2pt;
        }
        
        .item-subtitle {
            font-style: italic;
            color: #666666;
            margin-bottom: 2pt;
        }
        
        .item-description {
            margin-bottom: 4pt;
        }
        
        /* Compétences */
        .skill-category {
            margin-bottom: 8pt;
        }
        
        .skill-category-title {
            font-weight: bold;
            color: {{ $options['secondaryColor'] ?? '#243447' }};
            margin-bottom: 4pt;
        }
        
        .skill-item {
            margin-bottom: 4pt;
        }
        
        /* Mise en page et formatage pour Word */
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        table.skills td {
            padding: 2pt 0;
        }
        
        table.skills td.skill-name {
            width: 40%;
            font-weight: normal;
        }
        
        /* Langues */
        table.languages td {
            padding: 2pt 0;
        }
        
        table.languages td.language-name {
            width: 40%;
            font-weight: bold;
        }
        
        /* Réalisations */
        .achievements {
            margin-top: 4pt;
        }
        
        .achievement-item {
            margin-bottom: 2pt;
            padding-left: 12pt;
            position: relative;
        }
        
        .achievement-item::before {
            content: "•";
            position: absolute;
            left: 0;
        }
        
        /* Utilitaires */
        .technologies {
            margin-top: 4pt;
            font-style: italic;
            color: #666666;
        }
        
        /* Mise en page spécifique à Word */
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            @if(($options['showPhoto'] ?? true) && isset($personalInfo['photo']))
                <img src="{{ $personalInfo['photo'] }}" alt="{{ $personalInfo['name'] }}" class="photo">
            @endif
            
            <h1 class="name">{{ $personalInfo['name'] }}</h1>
            <h2 class="title">{{ $personalInfo['title'] }}</h2>
        </div>
        
        @if($options['showContact'] ?? true)
            <div class="contact-info">
                <table width="100%">
                    <tr>
                        <td width="25%"><span class="contact-label">Email:</span> {{ $personalInfo['email'] }}</td>
                        <td width="25%"><span class="contact-label">Téléphone:</span> {{ $personalInfo['phone'] }}</td>
                        <td width="50%"><span class="contact-label">Localisation:</span> {{ $personalInfo['location'] }}</td>
                    </tr>
                    @if(isset($personalInfo['website']) || isset($personalInfo['linkedin']) || isset($personalInfo['github']))
                    <tr>
                        @if(isset($personalInfo['website']))
                            <td><span class="contact-label">Site web:</span> {{ $personalInfo['website'] }}</td>
                        @else
                            <td></td>
                        @endif
                        
                        @if(isset($personalInfo['linkedin']))
                            <td><span class="contact-label">LinkedIn:</span> {{ $personalInfo['linkedin'] }}</td>
                        @else
                            <td></td>
                        @endif
                        
                        @if(isset($personalInfo['github']))
                            <td><span class="contact-label">GitHub:</span> {{ $personalInfo['github'] }}</td>
                        @else
                            <td></td>
                        @endif
                    </tr>
                    @endif
                </table>
            </div>
        @endif
        
        @if(in_array('profile', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Profil</h3>
                <p>{{ $personalInfo['bio'] }}</p>
            </div>
        @endif
        
        @if(in_array('experience', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Expérience Professionnelle</h3>
                
                @foreach($experiences as $experience)
                    <div class="experience-item">
                        <div class="item-header">
                            <div class="item-title">{{ $experience['position'] }} - {{ $experience['company'] }}</div>
                            <div class="item-subtitle">
                                {{ \Carbon\Carbon::parse($experience['startDate'])->format('m/Y') }}
                                @if(isset($experience['current']) && $experience['current'])
                                    - Présent
                                @elseif(isset($experience['endDate']))
                                    - {{ \Carbon\Carbon::parse($experience['endDate'])->format('m/Y') }}
                                @endif
                                @if(isset($experience['location']))
                                    | {{ $experience['location'] }}
                                @endif
                            </div>
                        </div>
                        
                        <div class="item-description">{{ $experience['description'] }}</div>
                        
                        @if(isset($experience['achievements']) && count($experience['achievements']) > 0)
                            <div class="achievements">
                                @foreach($experience['achievements'] as $achievement)
                                    <div class="achievement-item">{{ $achievement }}</div>
                                @endforeach
                            </div>
                        @endif
                        
                        @if(isset($experience['technologies']) && count($experience['technologies']) > 0)
                            <div class="technologies">
                                <strong>Technologies:</strong> {{ implode(', ', $experience['technologies']) }}
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>
        @endif
        
        @if(in_array('education', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Formation</h3>
                
                @foreach($education as $edu)
                    <div class="education-item">
                        <div class="item-header">
                            <div class="item-title">{{ $edu['degree'] }} - {{ $edu['field'] }}</div>
                            <div class="item-subtitle">
                                {{ $edu['institution'] }}
                                @if(isset($edu['location']))
                                    | {{ $edu['location'] }}
                                @endif
                            </div>
                            <div class="item-subtitle">
                                {{ \Carbon\Carbon::parse($edu['startDate'])->format('m/Y') }}
                                @if(isset($edu['endDate']))
                                    - {{ \Carbon\Carbon::parse($edu['endDate'])->format('m/Y') }}
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
        
        @if(in_array('skills', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Compétences Techniques</h3>
                
                @php
                    // Grouper les compétences par catégorie
                    $skillsByCategory = [];
                    foreach ($skills as $skill) {
                        $category = $skill['category'];
                        if (!isset($skillsByCategory[$category])) {
                            $skillsByCategory[$category] = [];
                        }
                        $skillsByCategory[$category][] = $skill;
                    }
                @endphp
                
                @foreach($skillsByCategory as $category => $categorySkills)
                    <div class="skill-category">
                        <div class="skill-category-title">{{ ucfirst($category) }}</div>
                        
                        <table class="skills">
                            @foreach($categorySkills as $skill)
                                <tr>
                                    <td class="skill-name">{{ $skill['name'] }}</td>
                                    <td>
                                        @php
                                            $skillLevel = $skill['level'];
                                            $skillText = '';
                                            
                                            if ($skillLevel == 1) $skillText = 'Notions';
                                            else if ($skillLevel == 2) $skillText = 'Basique';
                                            else if ($skillLevel == 3) $skillText = 'Intermédiaire';
                                            else if ($skillLevel == 4) $skillText = 'Avancé';
                                            else if ($skillLevel == 5) $skillText = 'Expert';
                                        @endphp
                                        
                                        {{ $skillText }}
                                    </td>
                                </tr>
                            @endforeach
                        </table>
                    </div>
                @endforeach
            </div>
        @endif
        
        @if(in_array('languages', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Langues</h3>
                
                <table class="languages">
                    @foreach($languages as $language)
                        <tr>
                            <td class="language-name">{{ $language['name'] }}</td>
                            <td>
                                @php
                                    $levelMap = [
                                        'native' => 'Langue maternelle',
                                        'fluent' => 'Courant',
                                        'advanced' => 'Avancé',
                                        'intermediate' => 'Intermédiaire',
                                        'basic' => 'Notions'
                                    ];
                                    
                                    $levelText = $levelMap[$language['level']] ?? $language['level'];
                                @endphp
                                {{ $levelText }}
                            </td>
                        </tr>
                    @endforeach
                </table>
            </div>
        @endif
        
        @if(in_array('certificates', $options['selectedSections'] ?? []))
            <div class="section">
                <h3 class="section-title">Certifications</h3>
                <!-- Contenu des certifications à ajouter ici -->
                <p>Les certifications seront ajoutées ultérieurement.</p>
            </div>
        @endif
    </div>
</body>
</html> 