<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $books = Book::select('id', 'title', 'description', 'image', 'genre', 'isbn', 'author', 'published', 'publisher')->latest()->get();
        return response()->json($books);
    }

    public function searchData(Request $request)
    {
        $search = $request->search;
        $books = Book::select('id', 'title', 'description', 'image', 'genre', 'isbn', 'author', 'published', 'publisher');
        if (isset($search)) {
            $books = $books->where('title', 'like', '%' . $search . '%')->orWhere('description', 'like', '%' . $search . '%')->orWhere('genre', 'like', '%' . $search . '%')->orWhere('isbn', 'like', '%' . $search . '%')->orWhere('author', 'like', '%' . $search . '%')
                ->orWhere('published', 'like', '%' . $search . '%')->orWhere('publisher', 'like', '%' . $search . '%');
        }
        $books = $books->latest()->paginate(12);
        return response($books, 200);
    }
    public function getProduct($id)
    {
        $book = Book::find($id);
        return response($book, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'genre' => 'required',
            'isbn' => 'required',
            'published' => 'required|date_format:Y-m-d',
            'publisher' => 'required'
        ]);

        try {
            Book::create($request->all());

            return response()->json([
                'message' => 'Book Created Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while creating a book!!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return response()->json($book);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function edit(Book $book)
    {
        return response()->json($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'author' => 'required',
            'genre' => 'required',
            'isbn' => 'required',
            'published' => 'required|date_format:Y-m-d',
            'publisher' => 'required'
        ]);

        try {
            $book->fill($request->all())->update();

            return response()->json([
                'message' => 'Book Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a Book!!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        try {
            $book->delete();

            return response()->json([
                'message' => 'Book Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a Book!!'
            ]);
        }
    }
}
