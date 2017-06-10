<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class subjectTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testAddSubjects()
    {
        $response = $this->json('POST', '/v1/subjects', ['subjects'=>
            [
                ['s_name_en' => 'Chem','s_name_zh'=>'化學'],
                ['s_name_en' => 'Bio','s_name_zh'=>'生物']
            ]
        ]);

        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => true,
            ]);
    }
}
