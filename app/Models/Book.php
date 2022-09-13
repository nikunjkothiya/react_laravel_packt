<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Elasticquent\ElasticquentTrait;

class Book extends Model
{
    use HasFactory, ElasticquentTrait;

    protected $fillable = ['title', 'author', 'genre', 'description', 'image', 'isbn', 'published', 'publisher'];
    protected $table = "books";

    protected $indexSettings = [
        'analysis' => [
            'char_filter' => [
                'replace' => [
                    'type' => 'mapping',
                    'mappings' => [
                        '&=> and '
                    ],
                ],
            ],
            'filter' => [
                'word_delimiter' => [
                    'type' => 'word_delimiter',
                    'split_on_numerics' => false,
                    'split_on_case_change' => true,
                    'generate_word_parts' => true,
                    'generate_number_parts' => true,
                    'catenate_all' => true,
                    'preserve_original' => true,
                    'catenate_numbers' => true,
                ]
            ],
            'analyzer' => [
                'default' => [
                    'type' => 'custom',
                    'char_filter' => [
                        'html_strip',
                        'replace',
                    ],
                    'tokenizer' => 'whitespace',
                    'filter' => [
                        'lowercase',
                        'word_delimiter',
                    ],
                ],
            ],
        ],
    ];

    function getIndexName()
    {
        return 'books';
    }

    function getTypeName()
    {
        return 'books';
    }

    protected $mappingProperties = array(
        'title' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'author' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'genre' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'description' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'isbn' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'published' => [
            'type' => 'text',
            "analyzer" => "standard",
        ],
        'publisher' => [
            'type' => 'text',
            "analyzer" => "standard",
        ]
    );
}
