<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SubscribeController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:subscribers,email',
        ]);

        if ($validator->fails()) {
            return back()->withErrors([
                'email' => __('email_already_subscribed'),
            ]);
        }

        Subscriber::create([
            'email' => $request->email,
            'status' => 'active',
        ]);

        return redirect()->route('coming-soon')->with('success', __('messages.subscribed'));
    }
}