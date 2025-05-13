<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Affiche la page de contact
     */
    public function index()
    {
        return Inertia::render('Contact/index');
    }

    /**
     * Traitement du formulaire de contact
     */
    public function send(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:100',
            'subject' => 'required|string|min:3|max:100',
            'message' => 'required|string|min:10|max:2000',
            'projectType' => 'required|string|in:website,app,design,other',
        ]);

        try {
            // Envoi de l'email
            Mail::to(config('mail.from.address'))->send(new ContactFormMail($validated));
            
            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'envoi du message.'
            ], 500);
        }
    }
} 