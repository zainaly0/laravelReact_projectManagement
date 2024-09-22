<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// use Database\Seeders\StudentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // $this->call([
        //     StudentSeeder::class
        // ]);

        User::factory()->create([
            'name' => 'zaid',
            'email' => 'zaid@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time(),

        ]);

        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
