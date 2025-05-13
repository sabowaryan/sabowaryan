import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { SITE_CONTAINER } from '@/components/guest/guest-header';
import {
    ChevronRight,
    Code,
    Copy,
    Download,
    FileCode,
    Play,
    RefreshCw,
    Terminal,
    Check,
    Braces,
    FileJson,
    FileText,
    Laptop,
    Eye,
    EyeOff
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
};

interface CodeExample {
    id: string;
    title: string;
    description: string;
    language: 'jsx' | 'typescript' | 'php' | 'css';
    code: string;
    output?: string;
    fileName?: string;
    lineHighlight?: number[];
}

const codeExamples: CodeExample[] = [
    {
        id: 'react-component',
        title: 'Composant React',
        description: 'Un composant React moderne utilisant les Hooks et TypeScript avec gestion des effets secondaires.',
        language: 'jsx',
        fileName: 'Counter.tsx',
        lineHighlight: [2, 6, 8, 16],
        code: `import { useState, useEffect } from 'react';

export function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
        output: `// Console output
Count: 0
// DOM renders a counter component
// Clicking "Increment" updates counter to 1, 2, 3...
// Clicking "Reset" resets counter to 0
// Document title updates with counter value`
    },
    {
        id: 'laravel-controller',
        title: 'Laravel Controller',
        description: 'Un contrôleur Laravel avec validation des données, relations Eloquent et retours Inertia.',
        language: 'php',
        fileName: 'ProjectController.php',
        lineHighlight: [14, 22, 26],
        code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Project;
use Illuminate\\Http\\Request;
use Inertia\\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('technologies')
            ->latest()
            ->paginate(6);
            
        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
        
        $project = Project::create($validated);
        
        return redirect()->route('projects.index')
            ->with('success', 'Projet créé avec succès');
    }
}`,
        output: `// API Response
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "Portfolio Website",
        "description": "Personal portfolio developed with Laravel and React",
        "created_at": "2023-06-15T09:23:45.000000Z",
        "technologies": [
          { "id": 1, "name": "React" },
          { "id": 3, "name": "Laravel" }
        ]
      },
      // ...more projects
    ],
    "meta": {
      "current_page": 1,
      "per_page": 6,
      "total": 12
    }
  }
}`
    },
    {
        id: 'typescript-utils',
        title: 'TypeScript Utils',
        description: 'Fonctions utilitaires TypeScript avec typage avancé et génériques.',
        language: 'typescript',
        fileName: 'utils.ts',
        lineHighlight: [1, 11, 18],
        code: `type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Type-safe deep clone utility for objects
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Type-safe cache wrapper with TTL support
 */
class Cache<T> {
  private store = new Map<string, { data: T; expires: number }>();

  set(key: string, value: T, ttlMs: number = 60000): void {
    this.store.set(key, {
      data: value,
      expires: Date.now() + ttlMs
    });
  }

  get(key: string): T | null {
    const item = this.store.get(key);
    
    if (!item) return null;
    if (Date.now() > item.expires) {
      this.store.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.store.clear();
  }
}

export { deepClone, Cache };
export type { FetchStatus };`,
        output: `// Example usage:
const cache = new Cache<User>();
cache.set('user-123', { id: 123, name: 'John' }, 30000);

// 10 seconds later...
const user = cache.get('user-123'); // Returns the cached user object

// 30+ seconds later...
const expiredUser = cache.get('user-123'); // Returns null (expired)`
    },
    {
        id: 'css-animation',
        title: 'Animation CSS',
        description: 'Animation CSS avancée avec keyframes et transitions pour un effet flottant.',
        language: 'css',
        fileName: 'animations.css',
        lineHighlight: [1, 14, 17],
        code: `@keyframes float {
  0% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.4);
  }
  50% {
    transform: translateY(-20px);
    box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: translateY(0px);
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.4);
  }
}

.floating-element {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(45deg, #c51f5d, #243447);
  animation: float 6s ease-in-out infinite;
  margin: 2rem auto;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.floating-element:hover {
  transform: scale(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .floating-element {
    animation: none;
  }
}`,
        output: '[Animation visible dans le navigateur - L\'élément flotte doucement de haut en bas avec un effet d\'ombre qui suit le mouvement]'
    }
];

export function InteractiveEditor() {
    const [activeTab, setActiveTab] = useState(codeExamples[0].id);
    const [isOutputVisible, setIsOutputVisible] = useState(false);
    const [isOutputLoading, setIsOutputLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [lineNumbers, setLineNumbers] = useState(true);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    
    const activeExample = codeExamples.find(example => example.id === activeTab) || codeExamples[0];

    // Detect theme changes
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');

        const observer = new MutationObserver(() => {
            const newIsDark = document.documentElement.classList.contains('dark');
            setTheme(newIsDark ? 'dark' : 'light');
        });

        observer.observe(document.documentElement, { attributes: true });
        
        return () => observer.disconnect();
    }, []);

    // Simulate code execution/loading
    const handleExecute = () => {
        if (!isOutputVisible) {
            setIsOutputLoading(true);
            setTimeout(() => {
                setIsOutputLoading(false);
                setIsOutputVisible(true);
            }, 800);
        } else {
            setIsOutputVisible(false);
        }
    };

    // Copy code to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(activeExample.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Download code file
    const downloadCode = () => {
        const element = document.createElement('a');
        const file = new Blob([activeExample.code], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = activeExample.fileName || `example.${activeExample.language}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Reset copy state when changing tabs
    useEffect(() => {
        setCopied(false);
        setIsOutputVisible(false);
    }, [activeTab]);

    // Get language icon
    const getLanguageIcon = (language: string) => {
        switch (language.toLowerCase()) {
            case 'jsx':
                return <Code size={16} className="text-primary" />;
            case 'php':
                return <FileCode size={16} className="text-primary" />;
            case 'typescript':
            case 'tsx':
                return <Braces size={16} className="text-primary" />;
            case 'json':
                return <FileJson size={16} className="text-primary" />;
            case 'css':
                return <FileText size={16} className="text-primary" />;
            default:
                return <Code size={16} className="text-primary" />;
        }
    };

    // Map language name for syntax highlighter
    const getLanguageForHighlighter = (language: string) => {
        switch (language.toLowerCase()) {
            case 'jsx': return 'jsx';
            case 'tsx': return 'tsx';
            case 'typescript': return 'typescript';
            case 'php': return 'php';
            case 'css': return 'css';
            case 'json': return 'json';
            default: return language.toLowerCase();
        }
    };

    // Create highlighted code with line numbers
    const renderCodeWithLineNumbers = (code: string, highlightLines: number[] = []) => {
        const highlightStyle: React.CSSProperties = {
            backgroundColor: theme === 'dark' ? 'rgba(62, 68, 113, 0.3)' : 'rgba(144, 202, 249, 0.2)',
            display: 'block',
            margin: '0 -1rem',
            padding: '0 1rem',
            borderRadius: '2px'
        };
        
        return (
            <div className="relative font-mono text-sm">
                <SyntaxHighlighter
                    language={getLanguageForHighlighter(activeExample.language)}
                    style={theme === 'dark' ? vscDarkPlus : vs}
                    showLineNumbers={lineNumbers}
                    wrapLines={true}
                    lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', textAlign: 'center' }}
                    lineProps={(lineNumber) => {
                        const style = highlightLines.includes(lineNumber) ? highlightStyle : {};
                        return { style };
                    }}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        borderRadius: 0,
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        );
    };

    return (
        <section className="py-28 relative overflow-hidden">
            {/* Background elements - enhanced with more modern gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/15 dark:to-primary/5 light:from-primary/10 light:to-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-[32rem] h-[32rem] bg-gradient-to-bl from-primary/10 to-primary/5 dark:from-primary/15 dark:to-primary/5 light:from-primary/10 light:to-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-secondary/5 dark:from-secondary/15 dark:to-secondary/5 light:from-secondary/10 light:to-secondary/5 rounded-full blur-3xl" />
            </div>
            
            <div className={cn(SITE_CONTAINER)}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block text-sm font-medium text-primary mb-3 px-4 py-1.5 bg-primary/10 dark:bg-primary/15 light:bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 shadow-sm"
                    >
                        Code & Exemples
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/90 dark:to-primary/80 light:from-primary light:via-primary/90 light:to-primary/80 bg-clip-text text-transparent">
                        Éditeur Interactif
                    </h2>
                    <p className="text-lg text-foreground/75 dark:text-muted-foreground light:text-foreground/80 max-w-2xl mx-auto">
                        Explorez des exemples de code qui illustrent mes compétences techniques à travers différents langages et frameworks.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={scaleIn}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={cn(
                        "rounded-xl overflow-hidden",
                        "bg-card/95 dark:bg-card/90 light:bg-card/95 backdrop-blur-md shadow-2xl border border-border/50 dark:border-border/30 light:border-border/60",
                        "max-w-5xl mx-auto",
                        "transform-gpu"
                    )}
                >
                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="border-b border-border/50 dark:border-border/30 light:border-border/60 px-5 py-3 bg-muted/30 dark:bg-muted/40 light:bg-muted/20 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center">
                                <div className="mr-3 p-2 rounded-md bg-primary/15 dark:bg-primary/25 light:bg-primary/10 border border-primary/15 dark:border-primary/25 light:border-primary/15 shadow-sm">
                                    <Laptop size={16} className="text-primary" />
                                </div>
                                <TabsList className="bg-background/70 dark:bg-background/60 light:bg-background/80 backdrop-blur-sm p-1 h-auto border border-border/30 dark:border-border/20 light:border-border/40 shadow-sm">
                                    {codeExamples.map(example => (
                                        <TabsTrigger 
                                            key={example.id} 
                                            value={example.id}
                                            className="text-xs md:text-sm relative py-1.5 text-foreground/80 dark:text-foreground/70 light:text-foreground/90 data-[state=active]:text-primary data-[state=active]:font-medium"
                                        >
                                            {example.title}
                                            {example.id === activeTab && (
                                                <motion.span 
                                                    layoutId="active-tab-pill"
                                                    className="absolute inset-0 bg-primary/15 dark:bg-primary/25 light:bg-primary/10 rounded-md -z-10 shadow-inner"
                                                />
                                            )}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                            
                            <div className="flex items-center gap-2 self-end md:self-auto">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setLineNumbers(!lineNumbers)}
                                    className="text-xs md:text-sm h-8 text-foreground/80 dark:text-foreground/70 light:text-foreground/90 hover:text-foreground hover:bg-muted/60"
                                >
                                    {lineNumbers ? (
                                        <>
                                            <EyeOff className="mr-1.5 h-3.5 w-3.5" />
                                            Masquer n°
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                                            Afficher n°
                                        </>
                                    )}
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={copyToClipboard}
                                    className="text-xs md:text-sm h-8 border-border/50 dark:border-border/30 light:border-border/60 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                                            Copié !
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="mr-1.5 h-3.5 w-3.5" />
                                            Copier
                                        </>
                                    )}
                                </Button>
                                <Button 
                                    variant="default" 
                                    size="sm" 
                                    onClick={handleExecute}
                                    className="text-xs md:text-sm h-8 shadow-sm hover:shadow-md transition-all duration-200 bg-primary hover:bg-primary/90 text-white font-medium relative overflow-hidden group"
                                    disabled={isOutputLoading}
                                >
                                    {isOutputLoading ? (
                                        <>
                                            <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                            Exécution...
                                        </>
                                    ) : isOutputVisible ? (
                                        <>
                                            <ChevronRight className="mr-1.5 h-3.5 w-3.5" />
                                            Masquer sortie
                                        </>
                                    ) : (
                                        <>
                                            <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                            <Play className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                                            Exécuter
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="p-0 m-0 relative">
                            {/* File name header */}
                            <div className="flex items-center justify-between px-5 py-2 border-b border-border/30 dark:border-border/20 light:border-border/40 bg-muted/20 dark:bg-muted/30 light:bg-muted/15">
                                <div className="flex items-center gap-2">
                                    {getLanguageIcon(activeExample.language)}
                                    <span className="text-xs font-mono text-foreground/80 dark:text-foreground/70 light:text-foreground/90 font-medium">
                                        {activeExample.fileName || `example.${activeExample.language}`}
                                    </span>
                                </div>
                                <span className="text-xs text-foreground/80 dark:text-foreground/70 light:text-foreground/90 px-2 py-0.5 rounded-full bg-muted/40 dark:bg-muted/50 light:bg-muted/30 border border-border/20 dark:border-border/10 light:border-border/30 font-medium">
                                    {activeExample.language}
                                </span>
                            </div>

                            {codeExamples.map(example => (
                                <TabsContent 
                                    key={example.id} 
                                    value={example.id} 
                                    className="p-0 m-0 relative data-[state=active]:relative data-[state=active]:z-10"
                                >
                                    <motion.div 
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                        transition={{ duration: 0.3 }}
                                        className="relative bg-card/80 dark:bg-card/70 light:bg-card/90 text-foreground dark:text-foreground/90 light:text-foreground/90"
                                    >
                                        {renderCodeWithLineNumbers(example.code, example.lineHighlight)}
                                    </motion.div>
                                    
                                    {/* Output panel */}
                                    <motion.div
                                        initial={false}
                                        animate={{ 
                                            height: isOutputVisible && example.id === activeTab ? 'auto' : '0px',
                                            opacity: isOutputVisible && example.id === activeTab ? 1 : 0
                                        }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        className="border-t border-border/50 dark:border-border/30 light:border-border/60 overflow-hidden bg-muted/20 dark:bg-muted/30 light:bg-muted/15"
                                    >
                                        <div className="px-5 py-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Terminal className="mr-2 h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium text-foreground dark:text-foreground/90 light:text-foreground">Sortie</span>
                                            </div>
                                            <span className="text-xs text-foreground/80 dark:text-foreground/70 light:text-foreground/90 px-2 py-0.5 rounded-full bg-muted/30 dark:bg-muted/40 light:bg-muted/20 border border-border/20 dark:border-border/10 light:border-border/30">
                                                Terminal
                                            </span>
                                        </div>
                                        <pre className="p-5 text-sm font-mono border-t border-border/20 dark:border-border/10 light:border-border/30 whitespace-pre-wrap bg-muted/10 dark:bg-muted/20 light:bg-muted/5 text-foreground/90 dark:text-foreground/80 light:text-foreground/90 rounded-sm mx-2 my-2 shadow-inner">
                                            <code>{example.output}</code>
                                        </pre>
                                    </motion.div>
                                </TabsContent>
                            ))}
                        </div>
                                
                        {/* Description panel */}
                        <div className="p-5 bg-muted/20 dark:bg-muted/30 light:bg-muted/15 border-t border-border/50 dark:border-border/30 light:border-border/60">
                            <h3 className="text-sm font-medium mb-2 flex items-center text-foreground dark:text-foreground/90 light:text-foreground">
                                <FileCode className="mr-2 h-4 w-4 text-primary" />
                                {activeExample.title}
                            </h3>
                            <p className="text-sm text-foreground/80 dark:text-foreground/70 light:text-foreground/90">{activeExample.description}</p>
                            
                            <div className="mt-4 flex items-center gap-3">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={downloadCode}
                                    className="text-xs border-border/50 dark:border-border/30 light:border-border/60 text-foreground/90 dark:text-foreground/80 light:text-foreground/90 hover:bg-muted/50 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <Download className="mr-1.5 h-3.5 w-3.5" />
                                    Télécharger
                                </Button>
                            </div>
                        </div>
                    </Tabs>
                </motion.div>
            </div>
        </section>
    );
} 