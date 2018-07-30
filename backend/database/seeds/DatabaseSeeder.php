<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
      foreach (\Config::get('database.connections') as $name => $details)
      {
        if($name !== 'mysql'){
//          $this->info('Running Seeder for "' . $name . '"');
          $this->call(RoleTableSeeder::class);
          \DB::connection()->setPdo(null);
        }
        //$this->call('migrate', array('--database' => $name, '--path' => 'app/database/migrations/' . $name));
      }
    }
}
