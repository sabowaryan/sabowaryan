import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
    Calendar, 
    MapPin, 
    Mail, 
    Phone, 
    Globe, 
    Github, 
    Linkedin, 
    ChevronRight,
    DownloadIcon,
    ZoomInIcon,
    ZoomOutIcon
} from 'lucide-react';
import type { CvOptions, Experience, Education, Skill, Language } from '@/types';

interface CvPreviewProps {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        website: string;
        github: string;
        linkedin: string;
        photo: string;
        bio: string;
    };
    experiences: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    options: CvOptions;
}

export function CvPreview({ personalInfo, experiences, education, skills, languages, options }: CvPreviewProps) {
    const [zoom, setZoom] = useState(100);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Handle zoom in/out
    const handleZoom = (direction: 'in' | 'out') => {
        if (direction === 'in' && zoom < 150) {
            setZoom(prev => prev + 10);
        } else if (direction === 'out' && zoom > 50) {
            setZoom(prev => prev - 10);
        }
    };
    
    // Render skill level indicator
    const renderSkillLevel = (level: number) => {
        return (
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "h-2 w-6 rounded-sm",
                            i < level ? "bg-primary" : "bg-muted"
                        )}
                    />
                ))}
            </div>
        );
    };
    
    // Render language level
    const renderLanguageLevel = (level: string) => {
        const levels = {
            'native': 'Natif',
            'fluent': 'Courant',
            'advanced': 'Avancé',
            'intermediate': 'Intermédiaire',
            'basic': 'Notions'
        };
        
        return levels[level as keyof typeof levels] || level;
    };
    
    return (
        <div className="relative bg-card border rounded-md shadow-md overflow-hidden">
            {/* Zoom controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-md p-1 border">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleZoom('out')}
                    disabled={zoom <= 50}
                >
                    <ZoomOutIcon className="h-4 w-4" />
                </Button>
                <span className="text-xs font-medium">{zoom}%</span>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleZoom('in')}
                    disabled={zoom >= 150}
                >
                    <ZoomInIcon className="h-4 w-4" />
                </Button>
            </div>
            
            {/* CV Paper */}
            <div className="bg-white overflow-auto p-4 h-[840px]">
                <div 
                    ref={contentRef}
                    style={{ 
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top center',
                        width: zoom === 100 ? '100%' : `${100 * 100 / zoom}%`,
                        margin: '0 auto'
                    }}
                    className="bg-white shadow-sm transition-transform duration-200 ease-in-out"
                >
                    {/* CV Header */}
                    <div className={cn(
                        "py-8 px-10 bg-gradient-to-r",
                        options.theme === 'modern' ? "from-primary/5 to-primary/10" : 
                        options.theme === 'creative' ? "from-primary/20 via-primary/5 to-transparent" : 
                        "bg-white"
                    )}>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {options.showPhoto && (
                                <div className={cn(
                                    "h-32 w-32 rounded-full overflow-hidden border-4",
                                    options.theme === 'modern' ? "border-primary/20" : 
                                    options.theme === 'creative' ? "border-primary" :
                                    "border-gray-200"
                                )}>
                                    <img 
                                        src={personalInfo.photo} 
                                        alt={personalInfo.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            )}
                            
                            <div className="flex-1">
                                <h1 className={cn(
                                    "text-3xl font-bold mb-1",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary" : ""
                                )}>
                                    {personalInfo.name}
                                </h1>
                                <h2 className="text-xl text-muted-foreground mb-4">
                                    {personalInfo.title}
                                </h2>
                                
                                {options.showContact && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Globe className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.website}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Github className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.github}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Linkedin className="h-4 w-4 mr-2 text-primary" />
                                            <span>{personalInfo.linkedin}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* CV Content */}
                    <div className="p-10 flex flex-col gap-8">
                        {/* Profile */}
                        {options.selectedSections.includes('profile') && (
                            <section>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-3 pb-2 border-b",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary border-primary/20" : "border-gray-200"
                                )}>
                                    Profil
                                </h3>
                                <p className="text-muted-foreground">
                                    {personalInfo.bio}
                                </p>
                            </section>
                        )}
                        
                        {/* Experience */}
                        {options.selectedSections.includes('experience') && (
                            <section>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-3 pb-2 border-b",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary border-primary/20" : "border-gray-200"
                                )}>
                                    Expérience Professionnelle
                                </h3>
                                
                                <div className="flex flex-col gap-6">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="flex gap-4">
                                            {options.theme === 'modern' && (
                                                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                                    {exp.logo ? (
                                                        <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" />
                                                    ) : (
                                                        <span className="text-xl font-bold text-primary">
                                                            {exp.company.substring(0, 1)}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{exp.position}</h4>
                                                        <div className="text-primary font-medium">{exp.company}</div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        <span>
                                                            {new Date(exp.startDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
                                                            {' — '}
                                                            {exp.current ? 'Présent' : new Date(exp.endDate as string).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {exp.description}
                                                </p>
                                                
                                                {exp.achievements && exp.achievements.length > 0 && (
                                                    <ul className="mt-2 space-y-1">
                                                        {exp.achievements.map((achievement, i) => (
                                                            <li key={i} className="text-sm flex">
                                                                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mr-1" />
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                
                                                {exp.technologies && exp.technologies.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-1">
                                                        {exp.technologies.map((tech, i) => (
                                                            <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Education */}
                        {options.selectedSections.includes('education') && (
                            <section>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-3 pb-2 border-b",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary border-primary/20" : "border-gray-200"
                                )}>
                                    Formation
                                </h3>
                                
                                <div className="flex flex-col gap-4">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="flex gap-4">
                                            {options.theme === 'modern' && (
                                                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                                    {edu.logo ? (
                                                        <img src={edu.logo} alt={edu.institution} className="w-8 h-8 object-contain" />
                                                    ) : (
                                                        <span className="text-xl font-bold text-primary">
                                                            {edu.institution.substring(0, 1)}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{edu.degree} - {edu.field}</h4>
                                                        <div className="text-primary">{edu.institution}</div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        <span>
                                                            {new Date(edu.startDate).toLocaleDateString('fr-FR', { year: 'numeric' })}
                                                            {' — '}
                                                            {new Date(edu.endDate as string).toLocaleDateString('fr-FR', { year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {edu.location && (
                                                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {edu.location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Skills */}
                        {options.selectedSections.includes('skills') && (
                            <section>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-3 pb-2 border-b",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary border-primary/20" : "border-gray-200"
                                )}>
                                    Compétences
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    {skills.map((skill) => (
                                        <div key={skill.id} className="flex items-center justify-between">
                                            <span className="font-medium">{skill.name}</span>
                                            {renderSkillLevel(skill.level)}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Languages */}
                        {options.selectedSections.includes('languages') && (
                            <section>
                                <h3 className={cn(
                                    "text-lg font-semibold mb-3 pb-2 border-b",
                                    options.theme === 'modern' || options.theme === 'creative' ? "text-primary border-primary/20" : "border-gray-200"
                                )}>
                                    Langues
                                </h3>
                                
                                <div className="flex gap-6">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="flex items-center gap-2">
                                            {lang.code && (
                                                <span className="text-lg font-semibold text-primary">
                                                    {lang.code}
                                                </span>
                                            )}
                                            <div>
                                                <div className="font-medium">{lang.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {renderLanguageLevel(lang.level)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 