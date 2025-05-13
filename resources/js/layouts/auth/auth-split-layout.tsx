import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function AuthSplitLayout({ 
    children, 
    title, 
    description,
    image = '/auth-background.jpg' // Default background image
}: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative grid min-h-dvh md:grid-cols-[1fr_1fr]">
            {/* Left Panel - Background Image */}
            <div className="relative hidden md:block">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-background/90 mix-blend-multiply" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-12">
                    <Link 
                        href={route('home')} 
                        className="group inline-flex items-center gap-3 text-lg font-medium text-white"
                    >
                        <AppLogoIcon className="size-8 transform fill-current transition-transform group-hover:scale-110" />
                        <span className="opacity-90 transition-opacity group-hover:opacity-100">
                            {name}
                        </span>
                    </Link>

                    <blockquote className="space-y-2">
                        <p className="text-lg font-light leading-relaxed text-white/90 lg:text-xl">
                            Discover the perfect blend of style and functionality.
                        </p>
                        <footer className="text-sm font-medium text-white/70">
                            Your Digital Journey Starts Here
                        </footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center p-6 md:p-8 lg:p-12"
            >
                <div className="w-full max-w-[400px] space-y-8">
                    {/* Mobile Logo */}
                    <Link 
                        href={route('home')} 
                        className="mb-8 flex items-center justify-center md:hidden"
                    >
                        <AppLogoIcon className="size-10 fill-current text-primary" />
                    </Link>

                    {/* Header Section */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            {title}
                        </h1>
                        <p className="text-muted-foreground text-balance text-sm leading-relaxed md:text-base">
                            {description}
                        </p>
                    </div>

                    {/* Auth Form Content */}
                    <div className="rounded-xl">
                        {children}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
