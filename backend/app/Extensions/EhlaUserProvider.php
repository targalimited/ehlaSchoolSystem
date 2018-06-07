<?php 

namespace App\Extensions;

use App\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Str;

class EhlaUserProvider implements UserProvider
{
	private $token;
	private $user;

	public function __construct (User $user) {
		$this->user = $user;
	}

	public function retrieveById ($id) {
		$user = $this->user->where('id', $id)->first();
		return $user ? $user : null;
	}

	public function retrieveByToken ($identifier, $token) {
		// $token = $this->token->with('user')->where($identifier, $token)->first();
		// return $token && $token->user ? $token->user : null;
		$user = $this->user->where($identifier, $token)->first();
		return $user ? $user : null;

	}

	public function updateRememberToken (Authenticatable $user, $token) {
		// update via remember token not necessary
	}

	public function retrieveUsermodelAccessToken () {
		$user = $this->user;
		$userRec = $user->first();
		$userJson = json_decode($userRec['session'], true);
		return $userJson['access_token'];
	}
	public function retrieveByCredentials (array $credentials) {
		// implementation upto user.
		// how he wants to implement -
		// let's try to assume that the credentials ['username', 'password'] given
		$user = $this->user;
		foreach ($credentials as $credentialKey => $credentialValue) {
			if (!Str::contains($credentialKey, 'password')) {
				$user->where($credentialKey, $credentialValue);
			}
		}
		return $user->first();
	}

	public function validateCredentials (Authenticatable $user, array $credentials) {
		$plain = $credentials['password'];
		return app('hash')->check($plain, $user->getAuthPassword());
	}
}