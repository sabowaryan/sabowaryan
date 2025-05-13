{
    "personalInfo": {
        "name": "{{ $personalInfo['name'] }}",
        "title": "{{ $personalInfo['title'] }}",
        "email": "{{ $personalInfo['email'] }}",
        "phone": "{{ $personalInfo['phone'] }}",
        "location": "{{ $personalInfo['location'] }}",
        @if(isset($personalInfo['website']))
        "website": "{{ $personalInfo['website'] }}",
        @endif
        @if(isset($personalInfo['github']))
        "github": "{{ $personalInfo['github'] }}",
        @endif
        @if(isset($personalInfo['linkedin']))
        "linkedin": "{{ $personalInfo['linkedin'] }}",
        @endif
        @if(isset($personalInfo['bio']))
        "bio": "{{ $personalInfo['bio'] }}"
        @endif
    },
    "experiences": [
        @foreach($experiences as $index => $experience)
        {
            "company": "{{ $experience['company'] }}",
            "position": "{{ $experience['position'] }}",
            "startDate": "{{ $experience['startDate'] }}",
            @if(isset($experience['current']) && $experience['current'])
            "current": true,
            @elseif(isset($experience['endDate']))
            "endDate": "{{ $experience['endDate'] }}",
            @endif
            "description": "{{ $experience['description'] }}",
            @if(isset($experience['location']))
            "location": "{{ $experience['location'] }}",
            @endif
            @if(isset($experience['achievements']) && count($experience['achievements']) > 0)
            "achievements": [
                @foreach($experience['achievements'] as $aIndex => $achievement)
                "{{ $achievement }}"{{ $aIndex < count($experience['achievements']) - 1 ? ',' : '' }}
                @endforeach
            ],
            @endif
            @if(isset($experience['technologies']) && count($experience['technologies']) > 0)
            "technologies": [
                @foreach($experience['technologies'] as $tIndex => $tech)
                "{{ $tech }}"{{ $tIndex < count($experience['technologies']) - 1 ? ',' : '' }}
                @endforeach
            ]
            @endif
        }{{ $index < count($experiences) - 1 ? ',' : '' }}
        @endforeach
    ],
    "education": [
        @foreach($education as $index => $edu)
        {
            "institution": "{{ $edu['institution'] }}",
            "degree": "{{ $edu['degree'] }}",
            "field": "{{ $edu['field'] }}",
            "startDate": "{{ $edu['startDate'] }}",
            @if(isset($edu['endDate']))
            "endDate": "{{ $edu['endDate'] }}",
            @endif
            @if(isset($edu['location']))
            "location": "{{ $edu['location'] }}"
            @endif
        }{{ $index < count($education) - 1 ? ',' : '' }}
        @endforeach
    ],
    "skills": [
        @foreach($skills as $index => $skill)
        {
            "name": "{{ $skill['name'] }}",
            "level": {{ $skill['level'] }},
            "category": "{{ $skill['category'] }}"
        }{{ $index < count($skills) - 1 ? ',' : '' }}
        @endforeach
    ],
    "languages": [
        @foreach($languages as $index => $language)
        {
            "name": "{{ $language['name'] }}",
            "level": "{{ $language['level'] }}",
            @if(isset($language['code']))
            "code": "{{ $language['code'] }}"
            @endif
        }{{ $index < count($languages) - 1 ? ',' : '' }}
        @endforeach
    ],
    "options": {
        "theme": "{{ $options['theme'] ?? 'modern' }}",
        "primaryColor": "{{ $options['primaryColor'] ?? '#c51f5d' }}",
        "secondaryColor": "{{ $options['secondaryColor'] ?? '#243447' }}",
        "paperSize": "{{ $options['paperSize'] ?? 'a4' }}",
        "spacing": "{{ $options['spacing'] ?? 'normal' }}",
        "selectedSections": [
            @foreach($options['selectedSections'] ?? ['profile', 'experience', 'education', 'skills', 'languages'] as $index => $section)
            "{{ $section }}"{{ $index < count($options['selectedSections'] ?? ['profile', 'experience', 'education', 'skills', 'languages']) - 1 ? ',' : '' }}
            @endforeach
        ],
        @if(isset($options['showPhoto']))
        "showPhoto": {{ $options['showPhoto'] ? 'true' : 'false' }},
        @endif
        @if(isset($options['showContact']))
        "showContact": {{ $options['showContact'] ? 'true' : 'false' }},
        @endif
        @if(isset($options['headerStyle']))
        "headerStyle": "{{ $options['headerStyle'] }}",
        @endif
        @if(isset($options['sectionStyle']))
        "sectionStyle": "{{ $options['sectionStyle'] }}",
        @endif
        @if(isset($options['skillStyle']))
        "skillStyle": "{{ $options['skillStyle'] }}"
        @endif
    },
    "generatedAt": "{{ now()->toIso8601String() }}"
} 