<?php

namespace App\Providers;

use App\Extensions\EhlaGuard;
use App\Extensions\EhlaUserProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('ehla', function ($app, $name, array $config) {

            $userProvider = app(EhlaUserProvider::class);
            $request = app('request');
            $session = $this->app['session.store'];
            // dd($this->app['session.store']);exit();
            return new EhlaGuard($name, $userProvider, $request, $session, $config);
        });
    }
}
