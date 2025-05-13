import React from 'react';
import { Link } from '@inertiajs/react';

interface ErrorPageProps {
  code: number;
  title: string;
  message: string;
  subtitle?: string;
}

const illustrations: Record<number, React.ReactNode> = {
  404: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
      <circle cx="40" cy="40" r="38" fill="#c51f5d10" stroke="#c51f5d" strokeWidth="2" />
      <text x="50%" y="54%" textAnchor="middle" fill="#c51f5d" fontSize="2.5rem" fontWeight="bold" dy=".3em">404</text>
      <rect x="25" y="55" width="30" height="6" rx="3" fill="#c51f5d20" />
    </svg>
  ),
  403: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
      <circle cx="40" cy="40" r="38" fill="#f59e4210" stroke="#f59e42" strokeWidth="2" />
      <path d="M40 25v20" stroke="#f59e42" strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="53" r="2.5" fill="#f59e42" />
    </svg>
  ),
  401: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-fade-in">
      <circle cx="40" cy="40" r="38" fill="#2563eb10" stroke="#2563eb" strokeWidth="2" />
      <rect x="28" y="32" width="24" height="18" rx="4" fill="#2563eb20" stroke="#2563eb" strokeWidth="2" />
      <circle cx="40" cy="41" r="3" fill="#2563eb" />
      <rect x="36" y="47" width="8" height="3" rx="1.5" fill="#2563eb" />
    </svg>
  ),
};

export default function ErrorPage({ code, title, message, subtitle }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-card/80 to-background px-4 py-16 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-2xl z-0" />
      <div className="bg-card/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full z-10">
        <div className="mb-6">{illustrations[code] || illustrations[404]}</div>
        <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">{title}</h1>
        {subtitle && <div className="text-base text-primary/80 mb-2 text-center font-medium">{subtitle}</div>}
        <p className="text-lg text-muted-foreground mb-8 text-center leading-relaxed">{message}</p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-lg font-semibold shadow-lg hover:bg-primary/90 transition-all">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 -ml-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
} 