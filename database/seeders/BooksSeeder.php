<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BooksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://fakerapi.it/api/v1/books?_quantity=100',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        $res = json_decode($response);

        foreach ($res->data as $key => $value) {
            $book = Book::create([
                'title' => $value->title,
                'author' => $value->author,
                'genre' => $value->genre,
                'description' => $value->description,
                'isbn' => $value->isbn,
                'image' => $value->image,
                'published' => $value->published,
                'publisher' => $value->publisher
            ]);
        }
    }
}
