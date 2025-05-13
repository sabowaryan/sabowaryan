import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, Settings2Icon, FileText, Palette, ListFilter, Layers } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import type { CvOptions } from '@/types';

interface CvSidebarProps {
    options: CvOptions;
    setOptions: (options: CvOptions) => void;
    isEditing: boolean;
}

export function CvSidebar({ options, setOptions, isEditing }: CvSidebarProps) {
    const [openSection, setOpenSection] = useState<string | null>('layout');
    
    // Toggle section visibility
    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    
    // Toggle an option in selected sections
    const toggleSectionContent = (section: string) => {
        const updatedSections = options.selectedSections.includes(section)
            ? options.selectedSections.filter(s => s !== section)
            : [...options.selectedSections, section];
            
        setOptions({
            ...options,
            selectedSections: updatedSections
        });
    };
    
    // List of available sections
    const availableSections = [
        { id: 'profile', label: 'Profil' },
        { id: 'experience', label: 'Expérience' },
        { id: 'education', label: 'Formation' },
        { id: 'skills', label: 'Compétences' },
        { id: 'languages', label: 'Langues' },
        { id: 'certificates', label: 'Certifications' },
        { id: 'projects', label: 'Projets' },
        { id: 'interests', label: 'Centres d\'intérêt' }
    ];
    
    // List of available themes
    const themes = [
        { id: 'classic', label: 'Classique' },
        { id: 'modern', label: 'Moderne' },
        { id: 'minimal', label: 'Minimaliste' },
        { id: 'creative', label: 'Créatif' }
    ];
    
    // List of available paper sizes
    const paperSizes = [
        { id: 'a4', label: 'A4' },
        { id: 'letter', label: 'Letter (US)' },
        { id: 'legal', label: 'Legal (US)' }
    ];
    
    // List of available spacing options
    const spacingOptions = [
        { id: 'compact', label: 'Compact' },
        { id: 'normal', label: 'Normal' },
        { id: 'spacious', label: 'Spacieux' }
    ];
    
    // List of available header styles
    const headerStyles = [
        { id: 'standard', label: 'Standard' },
        { id: 'centered', label: 'Centré' },
        { id: 'sidebar', label: 'Latéral' }
    ];
    
    // List of available section styles
    const sectionStyles = [
        { id: 'standard', label: 'Standard' },
        { id: 'boxed', label: 'Encadré' },
        { id: 'underlined', label: 'Souligné' },
        { id: 'sideline', label: 'Ligne latérale' }
    ];
    
    // List of available skill styles
    const skillStyles = [
        { id: 'bars', label: 'Barres' },
        { id: 'dots', label: 'Points' },
        { id: 'circles', label: 'Cercles' },
        { id: 'percentage', label: 'Pourcentage' },
        { id: 'tags', label: 'Tags' }
    ];
    
    return (
        <div className={cn(
            "p-5 bg-card rounded-lg border shadow-sm",
            isEditing ? "sticky top-24" : ""
        )}>
            <div className="flex items-center mb-4">
                <Settings2Icon className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-semibold">Options du CV</h3>
            </div>
            
            <Separator className="my-4" />
            
            {/* Layout Options */}
            <Collapsible
                open={openSection === 'layout'}
                onOpenChange={() => toggleSection('layout')}
                className="mb-4"
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2 h-auto">
                        <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Mise en page</span>
                        </div>
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            openSection === 'layout' ? "transform rotate-180" : ""
                        )} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 px-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-photo" className="cursor-pointer">Afficher la photo</Label>
                        <Switch
                            id="show-photo"
                            checked={options.showPhoto}
                            onCheckedChange={(checked: boolean) => setOptions({ ...options, showPhoto: checked })}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-contact" className="cursor-pointer">Afficher les contacts</Label>
                        <Switch
                            id="show-contact"
                            checked={options.showContact}
                            onCheckedChange={(checked: boolean) => setOptions({ ...options, showContact: checked })}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Format du papier</Label>
                        <RadioGroup 
                            value={options.paperSize} 
                            onValueChange={(value: 'a4' | 'letter' | 'legal') => setOptions({ ...options, paperSize: value })}
                            className="flex gap-2"
                        >
                            {paperSizes.map((size) => (
                                <div key={size.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={size.id} id={`paper-${size.id}`} />
                                    <Label htmlFor={`paper-${size.id}`} className="cursor-pointer">{size.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Espacement</Label>
                        <RadioGroup 
                            value={options.spacing || 'normal'} 
                            onValueChange={(value: 'compact' | 'normal' | 'spacious') => setOptions({ ...options, spacing: value })}
                        >
                            {spacingOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.id} id={`spacing-${option.id}`} />
                                    <Label htmlFor={`spacing-${option.id}`} className="cursor-pointer">{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Style d'en-tête</Label>
                        <RadioGroup 
                            value={options.headerStyle || 'standard'} 
                            onValueChange={(value: 'standard' | 'centered' | 'sidebar') => setOptions({ ...options, headerStyle: value })}
                        >
                            {headerStyles.map((style) => (
                                <div key={style.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={style.id} id={`header-${style.id}`} />
                                    <Label htmlFor={`header-${style.id}`} className="cursor-pointer">{style.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            
            {/* Theme Options */}
            <Collapsible
                open={openSection === 'theme'}
                onOpenChange={() => toggleSection('theme')}
                className="mb-4"
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2 h-auto">
                        <div className="flex items-center">
                            <Palette className="h-4 w-4 mr-2" />
                            <span>Thème et couleurs</span>
                        </div>
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            openSection === 'theme' ? "transform rotate-180" : ""
                        )} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 px-2 space-y-4">
                    <div className="space-y-2">
                        <Label>Thème général</Label>
                        <RadioGroup 
                            value={options.theme} 
                            onValueChange={(value: 'classic' | 'modern' | 'minimal' | 'creative') => setOptions({ ...options, theme: value })}
                        >
                            {themes.map((theme) => (
                                <div key={theme.id} className="flex items-center space-x-2 py-1">
                                    <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} />
                                    <Label htmlFor={`theme-${theme.id}`} className="cursor-pointer">{theme.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                        <Label className="flex items-center">Couleur principale</Label>
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-8 h-8 rounded-full border cursor-pointer"
                                style={{ backgroundColor: options.primaryColor || '#c51f5d' }}
                            >
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                            <span className="sr-only">Choisir une couleur</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-3">
                                        <div className="grid grid-cols-5 gap-2">
                                            {[
                                                '#c51f5d', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
                                                '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
                                                '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
                                                '#ff5722', '#795548', '#607d8b', '#f44336', '#000000'
                                            ].map((color) => (
                                                <Button
                                                    key={color}
                                                    variant="ghost"
                                                    className="w-8 h-8 p-0 rounded-full"
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setOptions({ ...options, primaryColor: color })}
                                                />
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <Input 
                                value={options.primaryColor || '#c51f5d'} 
                                onChange={(e) => setOptions({ ...options, primaryColor: e.target.value })}
                                className="h-9 w-32"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Style des sections</Label>
                        <RadioGroup 
                            value={options.sectionStyle || 'standard'} 
                            onValueChange={(value: 'standard' | 'boxed' | 'underlined' | 'sideline') => setOptions({ ...options, sectionStyle: value })}
                        >
                            {sectionStyles.map((style) => (
                                <div key={style.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={style.id} id={`section-style-${style.id}`} />
                                    <Label htmlFor={`section-style-${style.id}`} className="cursor-pointer">{style.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Affichage des compétences</Label>
                        <RadioGroup 
                            value={options.skillStyle || 'bars'} 
                            onValueChange={(value: 'bars' | 'dots' | 'circles' | 'percentage' | 'tags') => setOptions({ ...options, skillStyle: value })}
                        >
                            {skillStyles.map((style) => (
                                <div key={style.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={style.id} id={`skill-style-${style.id}`} />
                                    <Label htmlFor={`skill-style-${style.id}`} className="cursor-pointer">{style.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            
            {/* Sections Options */}
            <Collapsible
                open={openSection === 'sections'}
                onOpenChange={() => toggleSection('sections')}
                className="mb-4"
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2 h-auto">
                        <div className="flex items-center">
                            <Layers className="h-4 w-4 mr-2" />
                            <span>Sections</span>
                        </div>
                        <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            openSection === 'sections' ? "transform rotate-180" : ""
                        )} />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 px-2 space-y-3">
                    {availableSections.map((section) => (
                        <div key={section.id} className="flex items-center space-x-2">
                            <Checkbox 
                                id={`section-${section.id}`} 
                                checked={options.selectedSections.includes(section.id)}
                                onCheckedChange={() => toggleSectionContent(section.id)}
                            />
                            <Label 
                                htmlFor={`section-${section.id}`}
                                className="cursor-pointer"
                            >
                                {section.label}
                            </Label>
                        </div>
                    ))}
                </CollapsibleContent>
            </Collapsible>
            
            <Separator className="my-4" />
            
            <div className="text-xs text-muted-foreground">
                Les modifications apportées ici seront appliquées à l'aperçu du CV et aux téléchargements.
            </div>
        </div>
    );
} 