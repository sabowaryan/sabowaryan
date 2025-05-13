import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export function GuestContent({ className, ...props }: HTMLMotionProps<"main">) {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.1
            }}
            className={cn(
                'flex-1 overflow-x-hidden',
                'relative z-10',  // Assure que le contenu est au-dessus des éléments décoratifs
                'transition-all duration-300 ease-in-out',
                className
            )}
            {...props}
        />
    );
}