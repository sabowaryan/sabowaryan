<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Style\Font;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    /**
     * Affiche la page du CV
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Données du CV (dans un scénario réel, ces données pourraient être récupérées depuis une base de données)
        $cvData = [
            'lastUpdated' => now()->format('d/m/Y'),
            'downloadCount' => rand(50, 200), // Simulation
            'defaultOptions' => [
                'showPhoto' => true,
                'showContact' => true,
                'selectedSections' => ['profile', 'experience', 'education', 'skills', 'languages', 'certificates'],
                'theme' => 'modern',
                'paperSize' => 'a4',
                'primaryColor' => '#c51f5d',
                'secondaryColor' => '#243447',
                'spacing' => 'normal',
                'headerStyle' => 'standard',
                'sectionStyle' => 'standard',
                'skillStyle' => 'bars',
            ]
        ];
        
        return Inertia::render('CV/index', [
            'cvData' => $cvData
        ]);
    }
    
    /**
     * Met à jour les options du CV
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOptions(Request $request)
    {
        $options = $request->validate([
            'showPhoto' => 'boolean',
            'showContact' => 'boolean',
            'selectedSections' => 'array',
            'selectedSections.*' => 'string',
            'theme' => 'string|in:classic,modern,minimal,creative',
            'paperSize' => 'string|in:a4,letter,legal',
            'primaryColor' => 'string',
            'secondaryColor' => 'string',
            'spacing' => 'string|in:compact,normal,spacious',
            'headerStyle' => 'string|in:standard,centered,sidebar',
            'sectionStyle' => 'string|in:standard,boxed,underlined,sideline',
            'skillStyle' => 'string|in:bars,dots,circles,percentage,tags',
        ]);
        
        // Dans un scénario réel, nous sauvegarderions ces options dans la base de données
        // Pour l'utilisateur authentifié
        // User::find(auth()->id())->update(['cv_options' => $options]);
        
        // Vous pourriez également mettre à jour directement les fichiers de téléchargement ici
        
        return response()->json([
            'success' => true,
            'message' => 'Options mises à jour avec succès',
            'options' => $options
        ]);
    }
    
    /**
     * Télécharge le CV au format demandé
     *
     * @param Request $request
     * @param string $format
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function download(Request $request, $format = 'pdf')
    {
        // Validation du format
        $format = in_array($format, ['pdf', 'docx', 'json']) ? $format : 'pdf';
        
        // Récupérer les options du CV
        $options = [];
        if ($request->has('options')) {
            try {
                $options = json_decode($request->options, true);
            } catch (\Exception $e) {
                // En cas d'erreur de décodage, utiliser un tableau vide
                $options = [];
            }
        }
        
        // Récupérer les données du CV (dans une application réelle, elles viendraient de la base de données)
        $personalInfo = [
            'name' => 'Sabowa Ryan',
            'title' => 'Développeur Full Stack',
            'email' => 'contact@sabowaryan.com',
            'phone' => '+33 6 12 34 56 78',
            'location' => 'Paris, France',
            'website' => 'www.sabowaryan.com',
            'github' => 'sabowaryan',
            'linkedin' => 'sabowaryan',
            'photo' => public_path('images/hero/ryan.PNG'), // Utiliser une image existante
            'bio' => "Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web et mobiles innovantes. Spécialisé dans React, TypeScript et Laravel."
        ];
        
        $experiences = [
            [
                'company' => 'Agence Web Premium',
                'position' => 'Développeur Full Stack Senior',
                'startDate' => '2021-03',
                'current' => true,
                'description' => 'Développement d\'applications web complexes pour des clients grands comptes. Lead developer sur plusieurs projets stratégiques.',
                'achievements' => [
                    'Migration d\'une application legacy vers une architecture moderne React/TypeScript/Laravel',
                    'Réduction de 40% du temps de chargement sur l\'application principale',
                    'Mise en place d\'une CI/CD avec GitHub Actions'
                ],
                'technologies' => ['React', 'TypeScript', 'Laravel', 'AWS', 'Docker'],
                'location' => 'Paris, France'
            ],
            [
                'company' => 'Digital Solutions',
                'position' => 'Développeur Frontend',
                'startDate' => '2019-06',
                'endDate' => '2021-02',
                'description' => 'Conception et développement d\'interfaces utilisateur modernes et responsives pour des applications web et mobiles.',
                'technologies' => ['React', 'Vue.js', 'JavaScript', 'SCSS', 'Webpack'],
                'location' => 'Lyon, France'
            ]
        ];
        
        $education = [
            [
                'institution' => 'Université Polytechnique',
                'degree' => 'Master',
                'field' => 'Informatique - Spécialité Génie Logiciel',
                'startDate' => '2017-09',
                'endDate' => '2019-06',
                'location' => 'Paris, France'
            ],
            [
                'institution' => 'IUT Informatique',
                'degree' => 'DUT',
                'field' => 'Informatique',
                'startDate' => '2015-09',
                'endDate' => '2017-06',
                'location' => 'Bordeaux, France'
            ]
        ];
        
        $skills = [
            ['name' => 'React', 'level' => 5, 'category' => 'frontend'],
            ['name' => 'TypeScript', 'level' => 4, 'category' => 'frontend'],
            ['name' => 'Laravel', 'level' => 5, 'category' => 'backend'],
            ['name' => 'Node.js', 'level' => 4, 'category' => 'backend'],
            ['name' => 'PostgreSQL', 'level' => 4, 'category' => 'database'],
            ['name' => 'Docker', 'level' => 3, 'category' => 'devops'],
            ['name' => 'AWS', 'level' => 3, 'category' => 'devops'],
            ['name' => 'Git', 'level' => 5, 'category' => 'devops']
        ];
        
        $languages = [
            ['name' => 'Français', 'level' => 'native', 'code' => 'FR'],
            ['name' => 'Anglais', 'level' => 'fluent', 'code' => 'EN'],
            ['name' => 'Espagnol', 'level' => 'intermediate', 'code' => 'ES']
        ];
        
        // Nom du fichier de sortie
        $filename = "cv-ryan-sabowa";
        
        // Générer le fichier selon le format demandé
        switch ($format) {
            case 'pdf':
                return $this->generatePdf($filename, $personalInfo, $experiences, $education, $skills, $languages, $options);
            
            case 'docx':
                return $this->generateDocx($filename, $personalInfo, $experiences, $education, $skills, $languages, $options);
            
            case 'json':
                return $this->generateJson($filename, $personalInfo, $experiences, $education, $skills, $languages, $options);
            
            default:
                return back()->with('error', "Le format demandé n'est pas pris en charge.");
        }
    }
    
    /**
     * Génère un fichier PDF du CV
     */
    private function generatePdf($filename, $personalInfo, $experiences, $education, $skills, $languages, $options)
    {
        // Préparer les données pour la vue
        $data = [
            'personalInfo' => $personalInfo,
            'experiences' => $experiences,
            'education' => $education,
            'skills' => $skills,
            'languages' => $languages,
            'options' => $options
        ];
        
        // Générer le PDF avec la vue CV
        $pdf = PDF::loadView('cv.pdf', $data);
        
        // Configurer le format de page selon les options
        $paperSize = $options['paperSize'] ?? 'a4';
        if ($paperSize === 'letter') {
            $pdf->setPaper('letter');
        } elseif ($paperSize === 'legal') {
            $pdf->setPaper('legal');
        } else {
            $pdf->setPaper('a4');
        }
        
        // Télécharger le PDF
        return $pdf->download($filename . '.pdf');
    }
    
    /**
     * Génère un fichier DOCX du CV
     */
    private function generateDocx($filename, $personalInfo, $experiences, $education, $skills, $languages, $options)
    {
        // Préparer les données pour la vue
        $data = [
            'personalInfo' => $personalInfo,
            'experiences' => $experiences,
            'education' => $education,
            'skills' => $skills,
            'languages' => $languages,
            'options' => $options
        ];
        
        // Utiliser notre template Blade pour générer le HTML
        $html = view('cv.docx', $data)->render();
        
        // Créer un nouveau document Word
        $phpWord = new PhpWord();
        
        // Définir les paramètres de page en fonction des options
        $paperSize = $options['paperSize'] ?? 'a4';
        $section = $phpWord->addSection([
            'pageSizeW' => $paperSize === 'a4' ? 11906 : ($paperSize === 'letter' ? 12240 : 14040),
            'pageSizeH' => $paperSize === 'a4' ? 16838 : ($paperSize === 'letter' ? 15840 : 20160),
        ]);
        
        // Convertir le HTML en contenu Word
        \PhpOffice\PhpWord\Shared\Html::addHtml($section, $html, false, false);
        
        // Sauvegarder temporairement le fichier
        $tempFile = storage_path('app/public/' . $filename . '.docx');
        $objWriter = IOFactory::createWriter($phpWord, 'Word2007');
        $objWriter->save($tempFile);
        
        // Télécharger le fichier
        return response()->download($tempFile, $filename . '.docx')->deleteFileAfterSend(true);
    }
    
    /**
     * Génère un fichier JSON du CV
     */
    private function generateJson($filename, $personalInfo, $experiences, $education, $skills, $languages, $options)
    {
        // Préparer les données pour la vue
        $data = [
            'personalInfo' => $personalInfo,
            'experiences' => $experiences,
            'education' => $education,
            'skills' => $skills,
            'languages' => $languages,
            'options' => $options
        ];
        
        // Enlever le chemin de la photo qui est uniquement utile pour les documents
        if (isset($data['personalInfo']['photo']) && strpos($data['personalInfo']['photo'], public_path()) === 0) {
            $data['personalInfo']['photo'] = '/images/hero/ryan.PNG';
        }
        
        // Générer le JSON à partir du template Blade
        $jsonContent = view('cv.json', $data)->render();
        
        // Retourner le fichier JSON
        return response($jsonContent)
            ->header('Content-Type', 'application/json')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '.json"');
    }
} 