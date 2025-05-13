import { cn } from '@/lib/utils';
import { type HTMLAttributes, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function GuestShell({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Ajoute un petit délai pour que la transition soit visible
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ 
                opacity: isLoaded ? 1 : 0.6,
                y: isLoaded ? 0 : 10
            }}
            transition={{ 
                duration: 0.4,
                ease: "easeOut"
            }}
            className={cn(
                'relative flex min-h-dvh flex-col',
                'bg-background/30 backdrop-blur-[2px]',
                className
            )}
        >
            {/* Éléments décoratifs en arrière-plan */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute top-[60%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute -bottom-[5%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/5 blur-[80px]" />
            </div>
            
            {/* Contenu */}
            <div className="relative flex-1 flex flex-col z-10">
                {children}
            </div>
        </motion.div>
    );
}