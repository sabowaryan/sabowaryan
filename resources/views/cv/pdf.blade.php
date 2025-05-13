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
            --spacing: {{ $options['spacing'] === 'compact' ? '0.5rem' : ($options['spacing'] === 'spacious' ? '1.5rem' : '1rem') }};
        }
        
        /* Style général */
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 0;
        }
        
        /* Conteneur principal */
        .container {
            width: 100%;
            max-width: 920px;
            margin: 0 auto;
            padding: 2rem;
            box-sizing: border-box;
        }
        
        /* En-tête */
        .header {
            margin-bottom: var(--spacing);
            display: {{ $options['headerStyle'] === 'centered' ? 'flex' : 'block' }};
            flex-direction: {{ $options['headerStyle'] === 'centered' ? 'column' : 'row' }};
            align-items: {{ $options['headerStyle'] === 'centered' ? 'center' : 'flex-start' }};
            text-align: {{ $options['headerStyle'] === 'centered' ? 'center' : 'left' }};
            
            @if($options['headerStyle'] === 'sidebar')
                float: left;
                width: 30%;
                padding-right: 2rem;
            @endif
        }
        
        .name {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--primary-color);
            margin: 0;
            line-height: 1.2;
        }
        
        .title {
            font-size: 1.5rem;
            color: var(--secondary-color);
            margin: 0.5rem 0 1rem;
        }
        
        .photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            margin: {{ $options['headerStyle'] === 'centered' ? '0 auto 1rem' : '0 1rem 1rem 0' }};
            @if($options['headerStyle'] === 'centered')
                display: block;
            @else
                float: left;
            @endif
            border: 3px solid var(--primary-color);
        }
        
        /* Informations de contact */
        .contact-info {
            margin-bottom: var(--spacing);
            @if($options['headerStyle'] === 'sidebar')
                clear: both;
            @endif
        }
        
        .contact-item {
            margin-bottom: 0.25rem;
        }
        
        .contact-label {
            font-weight: bold;
            color: var(--primary-color);
        }
        
        /* Sections */
        .main-content {
            @if($options['headerStyle'] === 'sidebar')
                width: 65%;
                float: right;
            @endif
        }
        
        .section {
            margin-bottom: calc(var(--spacing) * 1.5);
            @if($options['sectionStyle'] === 'boxed')
                padding: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            @endif
            
            @if($options['sectionStyle'] === 'underlined')
                border-bottom: 2px solid var(--primary-color);
                padding-bottom: 1rem;
            @endif
            
            @if($options['sectionStyle'] === 'sideline')
                border-left: 4px solid var(--primary-color);
                padding-left: 1rem;
            @endif
        }
        
        .section-title {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-top: 0;
            margin-bottom: 1rem;
            font-weight: bold;
        }
        
        /* Expérience */
        .experience-item, .education-item {
            margin-bottom: var(--spacing);
        }
        
        .item-header {
            margin-bottom: 0.5rem;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 1.2rem;
            color: var(--secondary-color);
            margin-bottom: 0.25rem;
        }
        
        .item-subtitle {
            font-style: italic;
            color: #666;
            margin-bottom: 0.25rem;
        }
        
        .item-description {
            margin-bottom: 0.5rem;
        }
        
        /* Compétences */
        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .skill-category {
            margin-bottom: 1rem;
        }
        
        .skill-category-title {
            font-weight: bold;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }
        
        .skill-item {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        .skill-name {
            margin-right: 0.5rem;
            width: 40%;
        }
        
        .skill-level {
            flex: 1;
        }
        
        /* Style des barres de compétence */
        .skill-bars {
            height: 10px;
            background-color: #eee;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .skill-bar-fill {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: 5px;
        }
        
        /* Style des cercles de compétence */
        .skill-circles {
            display: flex;
        }
        
        .skill-circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 3px;
            background-color: #eee;
        }
        
        .skill-circle.filled {
            background-color: var(--primary-color);
        }
        
        /* Style des tags de compétence */
        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .skill-tag {
            background-color: var(--primary-color);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-size: 0.8rem;
        }
        
        /* Langues */
        .language-item {
            display: flex;
            margin-bottom: 0.5rem;
        }
        
        .language-name {
            width: 40%;
            font-weight: bold;
        }
        
        .language-level {
            flex: 1;
        }
        
        /* Réalisations */
        .achievements {
            margin-top: 0.5rem;
        }
        
        .achievement-item {
            margin-bottom: 0.25rem;
            position: relative;
            padding-left: 1rem;
        }
        
        .achievement-item::before {
            content: "•";
            position: absolute;
            left: 0;
            color: var(--primary-color);
        }
        
        /* Utilitaires */
        .technologies {
            margin-top: 0.5rem;
            font-style: italic;
            color: #666;
        }
        
        .clearfix::after {
            content: "";
            display: table;
            clear: both;
        }
        
        /* Page break utilities */
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header {{ $options['headerStyle'] === 'sidebar' ? 'sidebar-header' : '' }}">
            @if(($options['showPhoto'] ?? true) && isset($personalInfo['photo']))
                <img src="{{ $personalInfo['photo'] }}" alt="{{ $personalInfo['name'] }}" class="photo">
            @endif
            
            <div>
                <h1 class="name">{{ $personalInfo['name'] }}</h1>
                <h2 class="title">{{ $personalInfo['title'] }}</h2>
            </div>
        </div>
        
        @if($options['showContact'] ?? true)
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-label">Email:</span> {{ $personalInfo['email'] }}
                </div>
                <div class="contact-item">
                    <span class="contact-label">Téléphone:</span> {{ $personalInfo['phone'] }}
                </div>
                <div class="contact-item">
                    <span class="contact-label">Localisation:</span> {{ $personalInfo['location'] }}
                </div>
                @if(isset($personalInfo['website']))
                    <div class="contact-item">
                        <span class="contact-label">Site web:</span> {{ $personalInfo['website'] }}
                    </div>
                @endif
                @if(isset($personalInfo['linkedin']))
                    <div class="contact-item">
                        <span class="contact-label">LinkedIn:</span> {{ $personalInfo['linkedin'] }}
                    </div>
                @endif
                @if(isset($personalInfo['github']))
                    <div class="contact-item">
                        <span class="contact-label">GitHub:</span> {{ $personalInfo['github'] }}
                    </div>
                @endif
            </div>
        @endif
        
        <div class="main-content">
            @if(in_array('profile', $options['selectedSections'] ?? []))
                <div class="section">
                    <h3 class="section-title">Profil</h3>
                    <div>{{ $personalInfo['bio'] }}</div>
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
                        
                        $skillStyle = $options['skillStyle'] ?? 'bars';
                    @endphp
                    
                    <div class="skills-container">
                        @foreach($skillsByCategory as $category => $categorySkills)
                            <div class="skill-category">
                                <div class="skill-category-title">{{ ucfirst($category) }}</div>
                                
                                @if($skillStyle === 'tags')
                                    <div class="skill-tags">
                                        @foreach($categorySkills as $skill)
                                            <div class="skill-tag">{{ $skill['name'] }}</div>
                                        @endforeach
                                    </div>
                                @else
                                    @foreach($categorySkills as $skill)
                                        <div class="skill-item">
                                            <div class="skill-name">{{ $skill['name'] }}</div>
                                            <div class="skill-level">
                                                @if($skillStyle === 'bars')
                                                    <div class="skill-bars">
                                                        <div class="skill-bar-fill" style="width: {{ ($skill['level'] / 5) * 100 }}%"></div>
                                                    </div>
                                                @elseif($skillStyle === 'circles' || $skillStyle === 'dots')
                                                    <div class="skill-circles">
                                                        @for($i = 1; $i <= 5; $i++)
                                                            <div class="skill-circle {{ $i <= $skill['level'] ? 'filled' : '' }}"></div>
                                                        @endfor
                                                    </div>
                                                @elseif($skillStyle === 'percentage')
                                                    {{ ($skill['level'] / 5) * 100 }}%
                                                @endif
                                            </div>
                                        </div>
                                    @endforeach
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
            
            @if(in_array('languages', $options['selectedSections'] ?? []))
                <div class="section">
                    <h3 class="section-title">Langues</h3>
                    
                    @foreach($languages as $language)
                        <div class="language-item">
                            <div class="language-name">{{ $language['name'] }}</div>
                            <div class="language-level">
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
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
            
            @if(in_array('certificates', $options['selectedSections'] ?? []))
                <div class="section">
                    <h3 class="section-title">Certifications</h3>
                    <!-- Contenu des certifications à ajouter ici -->
                    <div>Les certifications seront ajoutées ultérieurement.</div>
                </div>
            @endif
        </div>
        
        <div class="clearfix"></div>
    </div>
</body>
</html> 