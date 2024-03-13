<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-user-command {username} {email} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates new user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $username = $this->argument('username');
        $email = $this->argument('email');
        $password = $this->argument('password');

        $newUser = User::create([
            'name' => $username,
            'email' => $email,
            'password' => $password
        ]);

        $this->line($newUser);

    }
}
