import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,var(--muted)_0%,transparent_100%)] opacity-20" />
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                {/* Logo Section */}
                <Link 
                    href={route('home')} 
                    className="group mx-auto flex items-center justify-center"
                >
                    <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-xl bg-primary/5 ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20">
                        <AppLogoIcon className="size-8 fill-current text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </Link>

                {/* Card Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="overflow-hidden border-none bg-card/50 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] backdrop-blur-[10px] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.1)]">
                        <CardHeader className="space-y-3 px-6 pt-6 pb-0 text-center sm:px-10">
                            <CardTitle className="text-2xl font-semibold tracking-tight">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground/80">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-10">
                            {children}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
