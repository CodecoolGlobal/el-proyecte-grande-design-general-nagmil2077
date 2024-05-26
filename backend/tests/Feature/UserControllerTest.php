<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/**
 * Class UserControllerTest
 *
 * This class contains feature tests for the UserController.
 */
class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the getUserById method.
     *
     * This test verifies that the getUserById method returns the expected user
     * data for a given user ID.
     *
     * @return void
     */
    public function testGetUserById()
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson([
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
            ]);
    }

    /**
     * Test the getUsers method.
     *
     * This test verifies that the getUsers method returns a list of users.
     *
     * @return void
     */
    public function testGetUsers()
    {
        User::factory()->count(5)->create();

        $response = $this->getJson("/api/users");

        $response->assertStatus(200)->assertJsonCount(5);
    }

    /**
     * Test the updateUser method.
     *
     * This test verifies that the updateUser method correctly updates the user's
     * profile information and returns a success message.
     *
     * @return void
     */
    public function testUpdateUser()
    {
        $user = User::factory()->create();

        $updateData = [
            'name' => 'Random Name',
            'email' => 'random@example.com',
        ];

        $response = $this->patchJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson(['message' => 'User profile updated successfully']);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Random Name',
            'email' => 'random@example.com',
        ]);
    }

    /**
     * Test the deleteUser method.
     *
     * This test verifies that the deleteUser method deletes the user and returns
     * a success message.
     *
     * @return void
     */
    public function testDeleteUser()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'User deleted successfully']);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
