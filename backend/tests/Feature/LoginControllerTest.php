<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * Class LoginControllerTest
 *
 * This class contains feature tests for the LoginController.
 */
class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login.
     *
     * This test verifies that a user can successfully log in with correct
     * credentials and receive an authentication token.
     *
     * @return void
     */
    public function testSuccessfulLogin()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'id',
            ]);
    }
}
