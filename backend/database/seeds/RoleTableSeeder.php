<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//      $mul_rows= [
//        [ 'id' => 3,
//          'name' => 'Student',
//          'email' => 'guest@domain.com',
//          'phone' => '+777',
//          'password' => bcrypt('password'),
//          'is_admin' => false,],
//        [  'name' => 'Alexander',
//          'surname' => 'Jones',
//          'email' => 'asd@asd.com',
//          'phone' => '+12321321312',
//          'password' => bcrypt('password'),
//          'is_admin' => true,]
//      ];

      \App\Role::query()->truncate();

    DB::query('INSERT INTO `school_roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
        (3, \'Student\', \'Student\', \'Normal Student\', NULL, NULL),
        (5, \'Teacher\', \'Teacher\', \'Normal Teacher\', NULL, NULL),
        (6, \'Panel Chair\', \'Panel Chair\', \'Panel Chair\', NULL, NULL),
        (7, \'Principal\', \'Principal\', \'Principal\', NULL, NULL),
        (8, \'Vice Principal\', \'Vice Principal\', \'Vice Principal\', NULL, NULL)'
      );
    }
}
