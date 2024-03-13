<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'test the user patience';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = $this->argument('user');
        $this->line("hello " . $user);
    }
}
