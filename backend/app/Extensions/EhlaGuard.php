<?php 

namespace App\Extensions;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EhlaGuard implements Guard
{
	use GuardHelpers;

	protected $request;
	protected $session;
	protected $loggedOut = false;
	protected $name;
	private $authKey = '';
	private $inputKey = '';

	public function __construct ($name, UserProvider $provider, Request $request, Session $session, $configuration) {

		$this->name = $name;
		$this->provider = $provider;
		$this->request = $request;
		$this->session = $session;
		$this->authKey = isset($configuration['authKey']) ? $configuration['authKey'] : 'extoken';
		$this->inputKey = isset($configuration['inputKey']) ? $configuration['inputKey'] : 'ex_token';
	}

	protected function updateSession($id)
	{
		$this->session->put($this->getName(), $id);
		$this->session->migrate(true);
		// print_r($this->session);
	}

	public function getName()
	{
		return 'login_'.$this->name.'_'.sha1(static::class);
	}



	public function login(AuthenticatableContract $user, $remember = false)
	{
		$this->updateSession($user->getAuthIdentifier());
		$this->user = $user;
		$this->loggedOut = false;
		return $user;
	}

	public function logout()
	{
		$this->session->remove($this->getName());
		try{
			DB::transaction(function () {
				DB::table('users')
				->where('id', $this->user->id)
				->update([
					'expiry_date' => Carbon::now()->format('Y-m-j'),
					'updated_at' => date('Y-m-d H:i:s')
				]);
			}, 5);
		} catch (\Exception $e) {
			// dd($e);
		}
		$this->user = null;
		$this->loggedOut = true;
	}

	public function user () {

		if (!is_null($this->user)) {
			return $this->user;
		}
		$user = null;
		// retrieve via token
		$token = $this->getTokenForRequest();

		if (!empty($token)) {
			$user = $this->provider->retrieveByToken($this->inputKey, $token);
		} else {
			$id = $this->session->get($this->getName());
			if (! is_null($id)) {
				$user = $this->provider->retrieveById($id);
			}
		}
		return $user;
	}
	
	public function retrieveUsermodelAccessToken () {
		return $this->provider->retrieveUsermodelAccessToken();
	}
	
	public function getuser () {

		$user = null;
		if (!is_null($this->user)) {
			$user = $this->user->toArray();
		} else {
			// retrieve via token
			$token = $this->getTokenForRequest();
			if (!empty($token)) {
				$user = $this->provider->retrieveByToken($this->inputKey, $token);
			}
		}
		
		$result = array(
			"user_id" => $user['id'],
			"user" => json_decode($user['user']),
			"ex_token" => $user['ex_token'],
			"school_id" => $user['school_id'],
			"roles" => $user['roles'],
		);

		$this->user = $user;
		return $result;
	}
	

	/**
	 * Get the token for the current request.
	 * @return string
	 */
	public function getTokenForRequest () {

		$token = $this->request->header($this->authKey);
		if (empty($token)) {
			$token = $this->request->query($this->authKey);
		}
		return $token;
	}
	

	/**
	 * Validate a user's credentials.
	 *
	 * @param  array $credentials
	 *
	 * @return bool
	 */
	public function validate (array $credentials = []) {
		if (empty($credentials[$this->inputKey])) {
			return false;
		}
		$credentials = [ $this->storageKey => $credentials[$this->inputKey] ];
		if ($this->provider->retrieveByCredentials($credentials)) {
			return true;
		}
		return false;
	}

	
}