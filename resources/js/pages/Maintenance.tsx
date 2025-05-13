import React from 'react';
import { Link } from '@inertiajs/react';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-card/80 to-background px-4 py-16 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-2xl z-0" />
      <div className="bg-card/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full z-10">
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
            <circle cx="40" cy="40" r="38" fill="#f59e4210" stroke="#f59e42" strokeWidth="2" />
            <path d="M25 55 L55 25" stroke="#f59e42" strokeWidth="4" strokeLinecap="round" />
            <rect x="30" y="50" width="20" height="6" rx="3" fill="#f59e42" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">Maintenance en cours</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center leading-relaxed">Notre site est temporairement indisponible pour cause de maintenance. Nous revenons très vite !</p>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-lg font-semibold shadow-lg hover:bg-primary/90 transition-all">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 -ml-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
} 