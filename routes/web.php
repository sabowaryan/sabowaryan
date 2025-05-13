<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CvController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\TutorialController;
use App\Http\Controllers\TutorialProgressController;
use Illuminate\Http\Request;
use App\Http\Controllers\SubscribeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::post('/subscribe', [SubscribeController::class, 'store'])->name('subscribe.store');


// Route des projets
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->where('slug', '[A-Za-z0-9\-]+')->name('projects.show');

// Route API pour récupérer les projets
Route::get('/api/projects', [ProjectController::class, 'getProjects']);

// Routes du CV
Route::get('/cv', [CvController::class, 'index'])->name('cv.index');
Route::get('/cv/download/{format?}', [CvController::class, 'download'])->name('cv.download');
Route::post('/cv/options', [CvController::class, 'updateOptions'])->name('cv.updateOptions');

// Routes de contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');

// Routes du blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Routes pour les compétences
Route::get('/skills', function () {
    return Inertia::render('skills/index');
})->name('skills.index');

Route::get('/skills/{slug}', function (string $slug) {
    return Inertia::render('skills/Show', ['slug' => $slug]);
})->name('skills.show');

// Routes pour les certifications
Route::get('/certifications', function () {
    return Inertia::render('certifications/index');
})->name('certifications.index');

// Routes pour les tutoriels
Route::get('/tutorials', [TutorialController::class, 'index'])->name('tutorials.index');
Route::get('/tutorials/{slug}', [TutorialController::class, 'show'])->where('slug', '[A-Za-z0-9\-]+')->name('tutorials.show');

// Route API pour récupérer les tutoriels
Route::get('/api/tutorials', [TutorialController::class, 'getTutorials']);

// Routes pour la progression et les ressources des tutoriels
Route::middleware(['auth'])->group(function () {
    Route::post('/api/tutorials/{tutorial}/progress', [TutorialProgressController::class, 'update']);
    Route::get('/api/tutorials/{tutorial}/resources/{resource}/download', [TutorialController::class, 'downloadResource']);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Dashboard client
    Route::get('/client/dashboard', [DashboardController::class, 'clientDashboard'])
        ->middleware('role:Client')
        ->name('client.dashboard');

    // Routes client
    Route::middleware(['role:Client'])->prefix('client')->group(function () {
        // Commandes
        Route::get('/orders', function () {
            return Inertia::render('client/orders/index');
        })->name('client.orders');
        
        Route::get('/orders/{id}', function ($id) {
            return Inertia::render('client/orders/show', ['orderId' => $id]);
        })->name('client.orders.show');
        
        Route::get('/orders/{id}/invoice', function ($id) {
            return Inertia::render('client/orders/invoice', ['orderId' => $id]);
        })->name('client.orders.invoice');
        
        // Projets en cours
        Route::get('/projects', function () {
            return Inertia::render('client/projects/index');
        })->name('client.projects');
        
        // Projets terminés
        Route::get('/projects/completed', function () {
            return Inertia::render('client/projects/completed');
        })->name('client.projects.completed');
        
        Route::get('/projects/{id}', function ($id) {
            return Inertia::render('client/projects/show', ['projectId' => $id]);
        })->name('client.projects.show');
        
        Route::get('/projects/{id}/files', function ($id) {
            return Inertia::render('client/projects/files', ['projectId' => $id]);
        })->name('client.projects.files');
        
        // Messagerie
        Route::get('/messages', function () {
            return Inertia::render('client/messages/index');
        })->name('client.messages');
        
        Route::get('/messages/new', function () {
            return Inertia::render('client/messages/new');
        })->name('client.messages.new');
        
        Route::post('/messages/send', function (Request $request) {
            // Traitement du message
            return redirect()->route('client.messages');
        })->name('client.messages.send');
        
        // Facturation
        Route::get('/billing', function () {
            return Inertia::render('client/billing/index');
        })->name('client.billing');
        
        Route::get('/billing/invoices/{id}', function ($id) {
            return Inertia::render('client/billing/invoice-details', ['invoiceId' => $id]);
        })->name('client.billing.invoice');
        
        Route::get('/billing/invoices/{id}/download', function ($id) {
            // Logique pour télécharger la facture
            return response()->download('path/to/invoice.pdf');
        })->name('client.billing.invoice.download');
        
        Route::get('/billing/invoices/{id}/pay', function ($id) {
            return Inertia::render('client/billing/pay', ['invoiceId' => $id]);
        })->name('client.billing.invoice.pay');
        
        Route::post('/billing/pay/{id}', function (Request $request, $id) {
            // Logique pour traiter le paiement
            return redirect()->route('client.billing')->with('success', 'Paiement effectué avec succès');
        })->name('client.billing.pay');
        
        // Support
        Route::get('/support', function () {
            return Inertia::render('client/support/index');
        })->name('client.support');
        
        Route::get('/support/faq', function () {
            return Inertia::render('client/support/faq');
        })->name('client.support.faq');
        
        Route::get('/support/faq/{id}', function ($id) {
            return Inertia::render('client/support/faq-detail', ['faqId' => $id]);
        })->name('client.support.faq.show');
        
        Route::get('/support/articles', function () {
            return Inertia::render('client/support/articles');
        })->name('client.support.articles');
        
        Route::get('/support/articles/{id}', function ($id) {
            return Inertia::render('client/support/article-detail', ['articleId' => $id]);
        })->name('client.support.articles.show');
        
        Route::get('/support/tickets', function () {
            return Inertia::render('client/support/tickets');
        })->name('client.support.tickets');
        
        Route::get('/support/tickets/{id}', function ($id) {
            return Inertia::render('client/support/ticket-detail', ['ticketId' => $id]);
        })->name('client.support.tickets.show');
        
        Route::get('/support/tickets/new', function () {
            return Inertia::render('client/support/ticket-new');
        })->name('client.support.tickets.new');
        
        Route::post('/support/tickets/create', function (Request $request) {
            // Logique pour créer un ticket
            return redirect()->route('client.support.tickets');
        })->name('client.support.tickets.create');
    });
    
    // Dashboard apprenant
    Route::get('/apprentice/dashboard', [DashboardController::class, 'apprenticeDashboard'])
        ->middleware('role:Apprentice')
        ->name('apprentice.dashboard');
    
    // Dashboard admin
    Route::get('/admin/dashboard', [DashboardController::class, 'adminDashboard'])
        ->middleware('role:Admin')
        ->name('admin.dashboard');
    
    // Dashboard super admin
    Route::get('/super-admin/dashboard', [DashboardController::class, 'superAdminDashboard'])
        ->middleware('role:Super Admin')
        ->name('super-admin.dashboard');
    
    // Route de profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
