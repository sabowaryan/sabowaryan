import React, { useEffect, useState } from "react";
import { COMING_SOON_DAYS } from "@/config/comingSoonDate";
import AppLogo from '@/components/app-logo';
import { toast } from 'react-hot-toast';
import { useForm, usePage, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { __, trans_choice, getLocale } from '@/helpers/translations';

interface Flash {
  success?: string;
  error?: string;
}

interface PageProps extends InertiaPageProps {
  flash?: Flash;
}

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com/sabowaryan",
    svg: (
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="12" fill="#1877F3"/>
        <path d="M16.67 8.667h-2.003V7.667c0-.48.32-.593.545-.593h1.432V5.08L15.01 5c-2.01 0-2.47 1.51-2.47 2.47v1.197H10v2.13h2.54V19h2.127v-6.203h1.432l.2-2.13z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/sabowaryan",
    svg: (
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="12" fill="#000"/>
        <path fill="#fff" d="M7.5 7.5h2.1l2.2 3.1 2.2-3.1h2.1l-3.2 4.5 3.3 4.5h-2.1l-2.3-3.2-2.3 3.2h-2.1l3.3-4.5-3.2-4.5z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/sabowaryan",
    svg: (
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="12" fill="url(#ig-gradient)"/>
        <defs>
          <linearGradient id="ig-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F58529"/>
            <stop offset="0.5" stopColor="#DD2A7B"/>
            <stop offset="1" stopColor="#515BD4"/>
          </linearGradient>
        </defs>
        <path d="M12 7.5A4.5 4.5 0 1 0 12 16.5A4.5 4.5 0 1 0 12 7.5Z" fill="#fff"/>
        <circle cx="17" cy="7" r="1" fill="#fff"/>
      </svg>
    ),
  },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  return { days, hours, minutes, seconds };
}

const FlipUnit = ({ value, label }: { value: number; label: string }) => {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setFlipping(false);
        setPrev(value);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center mx-1 md:mx-2">
      <div className="relative h-12 md:h-16 w-12 md:w-16 perspective-1000">
        <div className={`absolute inset-0 rounded-lg shadow-lg bg-gradient-to-br from-indigo-900/80 to-violet-800 backdrop-blur-sm border border-indigo-500/30 ${
          flipping ? "animate-flip" : ""
        }`}>
          <span className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold tabular-nums">
            {pad(value)}
          </span>
          <div className="absolute w-full h-[1px] top-1/2 left-0 bg-white/10"></div>
        </div>
      </div>
      <span className="text-white/80 text-[10px] md:text-xs mt-1 uppercase tracking-widest font-medium">{label}</span>
      <style>
        {`
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-flip {
          animation: flip 0.6s cubic-bezier(.4,1.4,.6,1);
        }
        @keyframes flip {
          0% { transform: rotateX(0deg);}
          50% { transform: rotateX(90deg);}
          100% { transform: rotateX(0deg);}
        }
        `}
      </style>
    </div>
  );
};

const SubscribeForm = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const page = usePage<PageProps>();
  const flash = page.props.flash || {};

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
  }, [flash]);

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Gérer les erreurs du serveur
  useEffect(() => {
    if (errors.email) {
      setValidationErrors([errors.email]);
    }
  }, [errors]);

  const validateEmail = (email: string) => {
    const errors: string[] = [];
    
    if (!email) {
      errors.push(__('email_required'));
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push(__('email_invalid'));
      }
    }
    
    return errors;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setData('email', newEmail);
    setValidationErrors(validateEmail(newEmail));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailErrors = validateEmail(data.email);
    if (emailErrors.length > 0) {
      setValidationErrors(emailErrors);
      return;
    }

    post(route('subscribe.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(__('subscribed'));
        reset();
        setValidationErrors([]);
      },
      onError: (errors) => {
        if (errors.email) {
          setValidationErrors([errors.email]);
        } else {
          toast.error(__('error'));
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="relative flex flex-col">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
          <div className="relative flex">
            <input
              type="email"
              value={data.email}
              onChange={handleEmailChange}
              placeholder={__('email_placeholder')}
              className={`w-full px-6 py-4 bg-black/30 backdrop-blur-md border-0 rounded-l-full text-white placeholder-white/50 focus:outline-none focus:ring-0 transition-all duration-300 ${
                validationErrors.length > 0 ? 'ring-2 ring-red-500' : ''
              }`}
              disabled={processing}
            />
            <button
              type="submit"
              disabled={processing}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-r-full px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-pink-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                __('subscribe')
              )}
            </button>
          </div>
        </div>
        {validationErrors.length > 0 && (
          <div className="mt-3 space-y-1">
            {validationErrors.map((error, index) => (
              <div key={index} className="flex items-center gap-1.5 text-red-400 text-sm">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-white/50 text-sm mt-3 text-center">
        {__('privacy_notice')}
      </p>
    </form>
  );
};

export const CountdownTimer = () => {
  const targetDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + COMING_SOON_DAYS);
    d.setHours(10, 0, 0, 0);
    return d;
  }, []);

  const [time, setTime] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Animation des particules
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Head>
        <title>{__('coming_soon')} | Herd</title>
        <meta name="description" content={__('new_experience_time', { date: targetDate.toLocaleDateString(getLocale() === 'fr' ? 'fr-FR' : 'en-US') })} />
      </Head>
      
      {/* Fond avec effet de particules */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-black"></div>
        <div className="stars-container">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            ></div>
          ))}
        </div>
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 z-0 transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(236,72,153,0.3) 50%, rgba(0,0,0,0) 70%)',
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
          }}
        ></div>
      </div>

      {/* Logo animé */}
      <div className="absolute top-6 inset-x-0 flex justify-center z-10">
        <div className="animate-float">
          <AppLogo className="w-16 h-16 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_25px_rgba(139,92,246,0.7)]" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative w-full max-w-3xl mx-8 z-10 mt-16 md:mt-24">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative p-6 md:p-8">
            {/* Lignes de grille décorative */}
            <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-20">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-full w-full border-r border-white/20"></div>
              ))}
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-3xl md:text-4xl font-black mb-2 tracking-tight text-center">
                {__('coming_soon')}
              </h1>
              
              <div className="text-white/80 text-sm md:text-base mb-6 text-center max-w-2xl">
                <p className="mb-1">{__('countdown_started')}</p>
                <p className="font-light">
                  {__('new_experience_time', {
                    date: targetDate.toLocaleDateString(getLocale() === 'fr' ? 'fr-FR' : 'en-US', {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  })}
                </p>
              </div>
              
              {/* Compte à rebours */}
              <div className="flex justify-center items-center gap-1 md:gap-3 mb-8">
                <FlipUnit value={time.days} label={__('days')} />
                <div className="text-pink-500 text-3xl font-thin mb-4">:</div>
                <FlipUnit value={time.hours} label={__('hours')} />
                <div className="text-pink-500 text-3xl font-thin mb-4">:</div>
                <FlipUnit value={time.minutes} label={__('minutes')} />
                <div className="text-pink-500 text-3xl font-thin mb-4">:</div>
                <FlipUnit value={time.seconds} label={__('seconds')} />
              </div>
              
              {/* Formulaire d'inscription */}
              <div className="w-full max-w-md mx-auto mb-12">
                <SubscribeForm />
              </div>
              
              {/* Icônes sociales */}
              <div className="flex space-x-5 mt-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="transform transition-all duration-300 hover:scale-125 hover:rotate-6 focus:outline-none"
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animations */}
      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          opacity: 0;
          animation: twinkle 10s infinite;
        }
        
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        `}
      </style>
    </div>
  );
};

export default CountdownTimer;