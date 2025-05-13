<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintenance en cours - 503</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
        .fade-in {
            opacity: 0;
            animation: fadeIn 1.2s ease-in-out 0.2s forwards;
        }
        .slide-in {
            opacity: 0;
            transform: translateY(30px);
            animation: slideIn 1.2s cubic-bezier(.4,1.4,.6,1) 0.5s forwards;
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes slideIn {
            to { opacity: 1; transform: translateY(0); }
        }
        .progress-bar {
            width: 180px;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin: 2.5rem auto 2rem auto;
            box-shadow: 0 2px 12px 0 #c51f5d22;
        }
        .progress-bar-inner {
            height: 100%;
            width: 40%;
            background: linear-gradient(90deg, #c51f5d 0%, #1a2634 100%);
            border-radius: 4px;
            animation: progress-move 1.5s infinite alternate;
        }
        @keyframes progress-move {
            0% { width: 20%; }
            100% { width: 90%; }
        }
        .plug-anim {
            animation: plug-move 2s infinite alternate;
        }
        @keyframes plug-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(18px); }
        }
        .halo-bg {
            position: absolute;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at 50% 30%, #c51f5d22 0%, #f0f0ea 60%, #f5f5f0 100%);
            z-index: 0;
            pointer-events: none;
        }
        @media (max-width: 640px) {
            .svg-landing { width: 90vw !important; height: auto !important; }
            .progress-bar { width: 90vw; max-width: 180px; }
            .main-title { font-size: 1.6rem !important; }
        }
    </style>
</head>
<body class="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[#f0f0ea] to-[#f5f5f0]">
    <div class="halo-bg"></div>
    <main class="flex flex-col items-center justify-center w-full min-h-screen pt-10 pb-8 px-2 sm:px-0 relative z-10">
        <!-- Logo centré en haut -->
        <img src="/logo.svg" alt="Logo du site" class="mx-auto mb-6 fade-in" style="height: 54px; width: auto; max-width: 180px;" />
        <!-- Illustration SVG géante -->
        <svg class="svg-landing fade-in" width="480" height="180" viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:98vw; height:auto;">
            <!-- Câble primary -->
            <path d="M0 90 Q120 90 200 90" stroke="#c51f5d" stroke-width="12" fill="none" />
            <!-- Prise primary -->
            <g class="plug-anim">
                <rect x="180" y="60" width="40" height="60" rx="14" fill="#c51f5d" />
                <rect x="180" y="78" width="40" height="28" rx="8" fill="#f0f0ea" />
                <rect x="216" y="78" width="4" height="28" rx="2" fill="#c51f5d" />
                <rect x="196" y="78" width="4" height="28" rx="2" fill="#c51f5d" />
            </g>
            <!-- Câble background -->
            <path d="M480 90 Q360 90 280 90" stroke="#1a2634" stroke-width="12" fill="none" />
            <!-- Prise background -->
            <g>
                <rect x="260" y="60" width="40" height="60" rx="14" fill="#1a2634" />
                <rect x="260" y="78" width="40" height="28" rx="8" fill="#f0f0ea" />
                <rect x="260" y="78" width="4" height="28" rx="2" fill="#2c3e50" />
                <rect x="276" y="78" width="4" height="28" rx="2" fill="#2c3e50" />
            </g>
            <!-- Éclats de déconnexion -->
            <g>
                <rect x="240" y="88" width="8" height="8" rx="4" fill="#c51f5d" transform="rotate(15 244 92)" />
                <rect x="232" y="76" width="6" height="6" rx="3" fill="#1a2634" transform="rotate(-10 235 79)" />
                <rect x="240" y="104" width="6" height="6" rx="3" fill="#2c3e50" transform="rotate(10 243 107)" />
            </g>
        </svg>
        <!-- Titre principal -->
        <h1 class="main-title slide-in text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#c51f5d] mb-4 text-center leading-tight mt-2">Le site est temporairement déconnecté</h1>
        <!-- Slogan créatif -->
        <div class="fade-in text-lg sm:text-xl text-[#1a2634] mb-2 text-center font-semibold">Un instant de pause pour mieux vous reconnecter à l'excellence.</div>
        <!-- Message -->
        <p class="fade-in text-base sm:text-lg text-[#2c3e50] mb-2 text-center max-w-xl">Nous réalisons une maintenance technique pour améliorer votre expérience.<br>Merci de votre patience, nous serons de retour très bientôt&nbsp;!</p>
        <!-- Barre de progression animée -->
        <div class="progress-bar"><div class="progress-bar-inner"></div></div>
    </main>
</body>
</html> 