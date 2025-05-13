<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouveau message de contact</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #c51f5d;
            color: #fff;
            padding: 15px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        .field-value {
            padding: 10px;
            background-color: #f7f7f7;
            border-radius: 3px;
        }
        .project-type {
            display: inline-block;
            background-color: #f0f0f0;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouveau message de contact</h1>
    </div>
    
    <div class="content">
        <div class="project-type">
            Type de projet: 
            @switch($data['projectType'])
                @case('website')
                    Site web
                    @break
                @case('app')
                    Application
                    @break
                @case('design')
                    Design
                    @break
                @default
                    Autre
            @endswitch
        </div>
        
        <div class="field">
            <div class="field-label">Nom</div>
            <div class="field-value">{{ $data['name'] }}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">{{ $data['email'] }}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Sujet</div>
            <div class="field-value">{{ $data['subject'] }}</div>
        </div>
        
        <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value">{{ $data['message'] }}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
    </div>
</body>
</html> 