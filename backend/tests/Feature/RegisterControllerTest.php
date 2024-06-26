<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Class RegisterControllerTest
 *
 * This class contains feature tests for the RegisterController.
 */
class RegisterControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful registration.
     *
     * This test verifies that a user can successfully register with valid data
     * and receive a success message along with the created user data.
     *
     * @return void
     */
    public function testSuccessfulRegistration()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ]
            ])
            ->assertJson(['message' => 'Registration successful']);

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertTrue(Hash::check('password', $user->password));
    }

    /**
     * Test registration with an existing email.
     *
     * This test verifies that a registration attempt with an email that already
     * exists in the database returns a validation error.
     *
     * @return void
     */
    public function testRegistrationWithExistingEmail()
    {
        $existingUser = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test registration with validation errors.
     *
     * This test verifies that registration attempts with invalid data return
     * appropriate validation errors.
     *
     * @return void
     */
    public function testRegistrationWithValidationErrors()
    {
        $userData = [
            'name' => '',
            'email' => 'definitely-not-an-email',
            'password' => '456',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }
}
