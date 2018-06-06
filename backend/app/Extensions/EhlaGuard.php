<?php 

namespace App\Extensions;

use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Session\Session;

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
		$result = json_decode($user, true);
		if (json_last_error() === JSON_ERROR_NONE) {
			// JSON is valid
			$user = $result;
		}
		return Response()->json($user, 200);
	}
	
	public function retrieveUsermodelAccessToken () {
		return $this->provider->retrieveUsermodelAccessToken();
	}
	
	public function dumpuser () {

		if (!is_null($this->user)) {
			return $this->user;
		}
		$user = null;
		// retrieve via token
		$token = $this->getTokenForRequest();

		if (!empty($token)) {
			$user = $this->provider->retrieveByToken($this->inputKey, $token);
		}
		return $this->user = $user;
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