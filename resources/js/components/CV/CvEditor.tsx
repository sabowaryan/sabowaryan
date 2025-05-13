import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Globe, 
    Github, 
    Linkedin, 
    Camera, 
    Pencil,
    Save,
    RefreshCw,
    Briefcase,
    GraduationCap,
    Lightbulb,
    Languages
} from 'lucide-react';
import type { Experience, Education, Skill, Language, CvOptions } from '@/types';

interface PersonalInfo {
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
}

interface CvEditorProps {
    personalInfo: PersonalInfo;
    setPersonalInfo: (info: PersonalInfo) => void;
    experiences: Experience[];
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
    education: Education[];
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
    skills: Skill[];
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
    languages: Language[];
    setLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
    options: CvOptions;
}

export function CvEditor({ 
    personalInfo, 
    setPersonalInfo,
    experiences,
    setExperiences,
    education,
    setEducation,
    skills,
    setSkills,
    languages,
    setLanguages,
    options
}: CvEditorProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    
    // Update personal info
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalInfo({
            ...personalInfo,
            [name]: value
        });
    };
    
    // Reset to default values
    const handleReset = () => {
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            setPersonalInfo({
                name: 'Sabowa Ryan',
                title: 'Développeur Full Stack',
                email: 'contact@sabowaryan.com',
                phone: '+33 6 12 34 56 78',
                location: 'Paris, France',
                website: 'www.sabowaryan.com',
                github: 'sabowaryan',
                linkedin: 'sabowaryan',
                photo: '/images/profile.jpg',
                bio: "Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web et mobiles innovantes. Spécialisé dans React, TypeScript et Laravel."
            });
            setIsLoading(false);
        }, 1000);
    };
    
    // Handle photo upload
    const handlePhotoUpload = () => {
        // In a real implementation, this would open a file dialog
        console.log('Upload photo');
    };
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                    <Pencil className="h-5 w-5 mr-2 text-primary" />
                    Personnaliser mon CV
                </h3>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        Réinitialiser
                    </Button>
                    <Button
                        size="sm"
                        disabled={isLoading}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                    </Button>
                </div>
            </div>
            
            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                    <TabsTrigger value="personal" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Information personnelles
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Expérience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Formation
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Compétences
                    </TabsTrigger>
                    <TabsTrigger value="languages" className="flex items-center">
                        <Languages className="mr-2 h-4 w-4" />
                        Langues
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="photo" className="text-base font-medium">Photo de profil</Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handlePhotoUpload}
                                        >
                                            <Camera className="mr-2 h-4 w-4" />
                                            Changer la photo
                                        </Button>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20">
                                            <img 
                                                src={personalInfo.photo} 
                                                alt={personalInfo.name} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            <p>Téléchargez une photo professionnelle au format JPG, PNG ou GIF.</p>
                                            <p>Taille recommandée: 400x400px.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                {/* Name & Title */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nom complet</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={personalInfo.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Titre professionnel</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={personalInfo.title}
                                            onChange={handleChange}
                                            placeholder="Développeur Full Stack"
                                        />
                                    </div>
                                </div>
                                
                                {/* Bio */}
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Biographie</Label>
                                    <Textarea
                                        id="bio"
                                        name="bio"
                                        value={personalInfo.bio}
                                        onChange={handleChange}
                                        placeholder="Décrivez-vous en quelques phrases..."
                                        rows={4}
                                    />
                                </div>
                                
                                <Separator />
                                
                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={personalInfo.email}
                                            onChange={handleChange}
                                            placeholder="john.doe@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center">
                                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                            Téléphone
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={personalInfo.phone}
                                            onChange={handleChange}
                                            placeholder="+33 6 12 34 56 78"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                            Localisation
                                        </Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={personalInfo.location}
                                            onChange={handleChange}
                                            placeholder="Paris, France"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website" className="flex items-center">
                                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                                            Site web
                                        </Label>
                                        <Input
                                            id="website"
                                            name="website"
                                            value={personalInfo.website}
                                            onChange={handleChange}
                                            placeholder="www.johndoe.com"
                                        />
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                {/* Social Media */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="github" className="flex items-center">
                                            <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                                            GitHub
                                        </Label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                                                github.com/
                                            </span>
                                            <Input
                                                id="github"
                                                name="github"
                                                value={personalInfo.github}
                                                onChange={handleChange}
                                                className="rounded-l-none"
                                                placeholder="username"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin" className="flex items-center">
                                            <Linkedin className="h-4 w-4 mr-2 text-muted-foreground" />
                                            LinkedIn
                                        </Label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md text-sm text-muted-foreground">
                                                linkedin.com/in/
                                            </span>
                                            <Input
                                                id="linkedin"
                                                name="linkedin"
                                                value={personalInfo.linkedin}
                                                onChange={handleChange}
                                                className="rounded-l-none"
                                                placeholder="username"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-6">
                    <div className="text-center p-12 text-muted-foreground">
                        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Module d'édition des expériences en développement</h3>
                        <p>
                            Cette fonctionnalité sera bientôt disponible. Elle permettra d'ajouter, de modifier et de supprimer
                            vos expériences professionnelles directement depuis cette interface.
                        </p>
                    </div>
                </TabsContent>
                
                <TabsContent value="education" className="space-y-6">
                    <div className="text-center p-12 text-muted-foreground">
                        <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Module d'édition des formations en développement</h3>
                        <p>
                            Cette fonctionnalité sera bientôt disponible. Elle permettra d'ajouter, de modifier et de supprimer
                            vos formations académiques directement depuis cette interface.
                        </p>
                    </div>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-6">
                    <div className="text-center p-12 text-muted-foreground">
                        <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Module d'édition des compétences en développement</h3>
                        <p>
                            Cette fonctionnalité sera bientôt disponible. Elle permettra d'ajouter, de modifier et de supprimer
                            vos compétences techniques directement depuis cette interface.
                        </p>
                    </div>
                </TabsContent>
                
                <TabsContent value="languages" className="space-y-6">
                    <div className="text-center p-12 text-muted-foreground">
                        <Languages className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Module d'édition des langues en développement</h3>
                        <p>
                            Cette fonctionnalité sera bientôt disponible. Elle permettra d'ajouter, de modifier et de supprimer
                            vos compétences linguistiques directement depuis cette interface.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
} 