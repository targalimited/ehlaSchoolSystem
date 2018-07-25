<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MigrateAllCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'migrations all database - config\database connections';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      //dd(\Config::get('database.connections'));

      foreach (\Config::get('database.connections') as $name => $details)
      {
       if($name !== 'mysql'){
          $this->info('Running migration for "' . $name . '"');
          $this->call('migrate', ['--force'=>true, '--database' => $name]);
         \DB::connection()->setPdo(null);
       }
        //$this->call('migrate', array('--database' => $name, '--path' => 'app/database/migrations/' . $name));
      }
    }
}
