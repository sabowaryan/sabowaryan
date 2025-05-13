import React, { useEffect, useState } from "react";
import { COMING_SOON_DAYS } from "@/config/comingSoonDate";
import AppLogo from '@/components/app-logo';
import { toast } from 'react-hot-toast';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { __ } from '@/helpers/translations';

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
        <rect width="24" height="24" rx="6" fill="#1877F3"/>
        <path d="M16.67 8.667h-2.003V7.667c0-.48.32-.593.545-.593h1.432V5.08L15.01 5c-2.01 0-2.47 1.51-2.47 2.47v1.197H10v2.13h2.54V19h2.127v-6.203h1.432l.2-2.13z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/sabowaryan",
    svg: (
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="#000"/>
        <path fill="#fff" d="M7.5 7.5h2.1l2.2 3.1 2.2-3.1h2.1l-3.2 4.5 3.3 4.5h-2.1l-2.3-3.2-2.3 3.2h-2.1l3.3-4.5-3.2-4.5z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/sabowaryan",
    svg: (
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" fill="url(#ig-gradient)"/>
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
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="relative h-14 md:h-16 w-14 md:w-16">
        <span
          className={`absolute inset-0 flex items-center justify-center text-white text-4xl md:text-5xl font-bold tabular-nums transition-all duration-300 ${
            flipping ? "animate-flip" : ""
          }`}
        >
          {pad(value)}
        </span>
      </div>
      <span className="text-white/60 text-xs mt-1 uppercase tracking-widest">{label}</span>
      <style>
        {`
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

  const validateEmail = (email: string) => {
    const errors: string[] = [];
    
    if (!email) {
      errors.push(__('messages.email_required'));
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push(__('messages.email_invalid'));
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
        toast.success(__('messages.subscribed'));
        reset();
        setValidationErrors([]);
      },
      onError: () => {
        toast.error(__('messages.error'));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="relative flex flex-col">
        <div className="relative">
          <input
            type="email"
            value={data.email}
            onChange={handleEmailChange}
            placeholder={__('messages.email_placeholder')}
            className={`w-full px-6 py-3 bg-white/10 border rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 ${
              validationErrors.length > 0 ? 'border-red-400' : 'border-white/20'
            }`}
            disabled={processing}
          />
          <button
            type="submit"
            disabled={processing}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#A78BFA]/90 to-[#C4B5FD] text-white font-semibold rounded-full px-6 py-2 shadow-lg backdrop-blur-md transition hover:shadow-2xl hover:from-[#8B5CF6] hover:to-[#A78BFA] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              __('messages.subscribe')
            )}
          </button>
        </div>
        {validationErrors.length > 0 && (
          <div className="mt-2 space-y-1">
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
      <p className="text-white/50 text-sm mt-2 text-center">
        {__('messages.privacy_notice')}
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

  // Animation du fond (halo mouvant)
  const [halo, setHalo] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setHalo((h) => (h + 1) % 360), 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7C3AED] via-[#C026D3]/60 to-[#2563EB] overflow-hidden px-2 py-8">
      {/* Demi-cercle horloge géant à droite */}
      <div className="pointer-events-none fixed right-0 top-0 h-full w-[60vw] z-0 flex items-center justify-end">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 1000"
          className="h-full w-full"
          style={{ minHeight: "100vh", maxHeight: "none" }}
        >
          {[...Array(24)].map((_, i) => {
            const angle = (i * 180) / 24 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 320;
            const y1 = 500 + Math.sin(rad) * 320;
            const x2 = 200 + Math.cos(rad) * 390;
            const y2 = 500 + Math.sin(rad) * 390;
            const activeIndex = Math.floor((time.seconds / 60) * 24);
            const isActive = i === activeIndex;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? "#EC4899" : "#fff"}
                strokeWidth={isActive ? 8 : 3}
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.5}
                className={isActive ? "animate-pulse" : ""}
                style={{
                  filter: isActive ? "drop-shadow(0 0 16px #EC4899)" : "none",
                  transition: "filter 0.2s"
                }}
              />
            );
          })}
          {/* Centre */}
          <circle cx="200" cy="500" r="30" fill="#fff" opacity="0.9" />
          <circle cx="200" cy="500" r="14" fill="#EC4899" opacity="0.8" />
        </svg>
      </div>
      {/* Halo & décor animé */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(${halo},100%,80%) 0%, #f0f0ea00 80%)`,
          opacity: 0.25,
          transition: "background 0.2s",
        }}
      />
      {/* Logo animé */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 drop-shadow-xl group">
        <AppLogo className="w-24 h-24 object-contain transition-transform duration-500 group-hover:rotate-12" />
      </div>
      {/* Carte centrale landing */}
      <div className="relative w-full max-w-2xl bg-[#2D0C5E]/95 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 md:p-12 mt-32 md:mt-0 backdrop-blur-md bg-opacity-80 border border-white/10 z-10 mx-auto">
        <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-2 tracking-tight animate-fade-in text-center">Bientôt disponible</h1>
        <div className="text-white/70 text-base md:text-lg mb-6 animate-fade-in delay-100 text-center">
          <span className="font-semibold text-pink-400">Le compte à rebours est lancé.</span> <br />
          Une nouvelle expérience arrive le{" "}
          <span className="font-bold text-primary">
            {targetDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </span>
          .
        </div>
        {/* Compte à rebours animé */}
        <div className="flex justify-center items-end gap-6 md:gap-8 mb-8 flex-wrap animate-fade-in delay-200">
          <FlipUnit value={time.days} label="jours" />
          <FlipUnit value={time.hours} label="heures" />
          <FlipUnit value={time.minutes} label="minutes" />
          <FlipUnit value={time.seconds} label="secondes" />
          {/* Tiret rose */}
          <div className="hidden md:block h-1 w-10 bg-pink-400 rounded-full mx-2 animate-pulse" />
        </div>
        {/* Bouton Subscribe animé */}
        <div className="w-full max-w-md mx-auto animate-fade-in delay-300">
          <SubscribeForm />
        </div>
        {/* Icônes sociales animées */}
        <div className="flex space-x-4 mt-auto">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="transition hover:scale-110 focus:outline-none"
              aria-label={s.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.svg}
            </a>
          ))}
        </div>
      </div>
      {/* Animations utilitaires */}
      <style>
        {`
        .glassmorphism {
          background: rgba(255,255,255,0.08);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          backdrop-filter: blur(8px);
        }
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(.4,1.4,.6,1) both;
        }
        .animate-fade-in.delay-100 { animation-delay: .1s; }
        .animate-fade-in.delay-200 { animation-delay: .2s; }
        .animate-fade-in.delay-300 { animation-delay: .3s; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default CountdownTimer;