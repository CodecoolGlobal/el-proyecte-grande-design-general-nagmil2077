<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
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
     * @return void
     */
    public function testGetUsers()
    {
        User::factory()->count(5)->create();

        $response = $this->getJson("/api/users");

        $response->assertStatus(200)->assertJsonCount(5);
    }

    /**
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
