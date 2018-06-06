<?php

namespace App\Extensions;

use Illuminate\Support\Facades\DB;
use Config;

class Dbotf {

	protected $database;
	protected $connection;
	
	/**
	 * Create a new on the fly database connection.
	 * @param  array $options
	 * @return void
	 */
	public function __construct($options = null)
	{	

		// Set the database
		$database = $options['database'];
		$this->database = $database;
		// Figure out the driver and get the default configuration for the driver
		$driver  = isset($options['driver']) ? $options['driver'] : Config::get("database.default");
		$default = Config::get("database.connections.mysql");

		// Loop through our default array and update options if we have non-defaults
		foreach($default as $item => $value)
		{
			$default[$item] = isset($options[$item]) ? $options[$item] : $default[$item];
		}
		// Set the temporary configuration
		Config::set("database.connections.$database", $default);
		// Create the connection
		
		$this->connection = DB::connection($database);
		DB::setDefaultConnection($database);
	}
	

	/**
	 * Get the on the fly connection.
	 *
	 * @return \Illuminate\Database\Connection
	 */
	public function getConnection()
	{
		return $this->connection;
	}
	

	/**
	 * Get a table from the on the fly connection.
	 *
	 * @var    string $table
	 * @return \Illuminate\Database\Query\Builder
	 */
	public function getTable($table = null)
	{
		return $this->getConnection()->table($table);
	}

}