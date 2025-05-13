import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useWeather } from '@/hooks/use-weather';
import GuestLayout from '@/layouts/guest-layout';
import { Hero } from '@/components/Hero';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { InteractiveEditor } from '@/components/InteractiveEditor';
import { ContactForm } from '@/components/ContactForm';

export default function Welcome() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { theme } = useTheme();
    const { weather } = useWeather();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <GuestLayout>
            <Head title="Welcome" />
            
            <main className="relative min-h-screen">
                {/* Hero Section */}
                <Hero />

                {/* Features Grid */}
                <FeaturesGrid />
                
                {/* About Section */}
                <About />
                
                {/* Portfolio */}
                <Portfolio />
                
                {/* Interactive Editor */}
                <InteractiveEditor />
                
                {/* Contact Form */}
                <ContactForm />
            </main>
        </GuestLayout>
    );
}