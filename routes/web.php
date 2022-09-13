<?php

use App\Models\Book;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/testdata', function () {
    // Dummy data add

    // $curl = curl_init();

    // curl_setopt_array($curl, array(
    //     CURLOPT_URL => 'https://fakerapi.it/api/v1/books?_quantity=100',
    //     CURLOPT_RETURNTRANSFER => true,
    //     CURLOPT_ENCODING => '',
    //     CURLOPT_MAXREDIRS => 10,
    //     CURLOPT_TIMEOUT => 0,
    //     CURLOPT_FOLLOWLOCATION => true,
    //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    //     CURLOPT_CUSTOMREQUEST => 'GET',
    // ));

    // $response = curl_exec($curl);

    // curl_close($curl);
    // $res = json_decode($response);

    // foreach ($res->data as $key => $value) {
    //     $book = Book::create([
    //         'title' => $value->title,
    //         'author' => $value->author,
    //         'genre' => $value->genre,
    //         'description' => $value->description,
    //         'isbn' => $value->isbn,
    //         'image' => $value->image,
    //         'published' => $value->published,
    //         'publisher' => $value->publisher
    //     ]);


    //     // $book->addToIndex();
    // }

    // $books = Book::where('id', '<', 200)->get();
    // $books->addToIndex();

    // Book::reindex();
    dd('done');
});
